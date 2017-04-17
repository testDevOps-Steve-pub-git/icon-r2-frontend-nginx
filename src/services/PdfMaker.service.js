(function () {
'use strict';

  // const PromiseFileReader = require('promise-file-reader');
  const BlobUtil = require('blob-util');
  module.exports = PdfMaker;

  function PdfMaker (
    $q, $translate,
    moment,
    By, Endpoint, GroupsOf, ImmunizationRecordService, Multitenancy, Notify, TokenHandler,
    Address,
    DISEASE_YC_ORDER, ICON_NOTIFICATION
  ) {
/* Private ********************************************************************/
    const fontSize = {
      H1:   20,
      H2:   18,
      H3:   16,
      H4:   14,
      BODY: 12,
      SMALL: 10,
    };

    const bold = (text) => ({ text: text, bold: true });

    /* Text formatters ********************************************************/

    function isAgentWithoutTrade (immunization) {
      return !immunization.trade.snomed;
    }

    function createRotatedTextDataUrl (text) {
      const CANVAS_WIDTH = 18;
      const CANVAS_HEIGHT = 170;
      const TRANSLATE_X = CANVAS_WIDTH - 4;
      const TRANSLATE_Y = CANVAS_HEIGHT - 10;

      let canvas = window.document.createElement('canvas');
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      let ctx = canvas.getContext('2d');
      ctx.font = 'bold 14pt Sans-Serif';
      ctx.save();
      ctx.translate(TRANSLATE_X, TRANSLATE_Y);
      ctx.rotate(-0.5 * Math.PI);
      ctx.fillStyle = '#000';
      ctx.fillText(text, 0, 0);
      ctx.restore();

      return canvas.toDataURL();
    };

    function formatAddress (address) {
      switch (address.addressType) {
        case Address.type.RURAL:
          return [
            `RR ${address.ruralRoute}${(address.station) ? `, STN ${address.station}` : ``}${(address.line2) ? `\n${address.line2}` : ``}`
            `${address.city}, ${address.province}`,
            `${address.postalCode}`,
          ].join(`\n`);

        case Address.type.POBOX:
          return [
            `BOX ${address.postBox}${(address.station) ? `, STN ${address.station}` : ``}`,
            `RPO ${address.retailPostOffice}`
            `${address.city}, ${address.province}`,
            `${address.postalCode}`,
          ].join(`\n`);

        case Address.type.URBAN:
        default:
          return [
            `${address.streetNumber}${address.unitNumber ? ` - ${address.unitNumber}` : ``} ${address.streetNumber} ${address.streetType ? ` ${address.streetType}` : ``}${address.streetDirection ? ` ${address.streetDirection}` : ``}`,
            `${address.city}, ${address.province}`,
            `${address.postalCode}`,
          ].join(`\n`);
      }
    }

    function formatGender (gender) {
      switch (gender.toLowerCase()) {
        case `male`:
          return `pdf.genderType_male`;

        case `female`:
          return `pdf.genderType_female`;

        case `other`:
        default:
          return `pdf.genderType_other`;
      }
    }

    function formatDiseases (diseases) {
      return (diseases.length)
                ? diseases
                  .map(disease => disease.name)
                  .join(`, `)
                : ``;
    }

    function formatImmunizationDetails (immunization) {
      let immunizationName = isAgentWithoutTrade(immunization)
                                ? { text: `${immunization.agent.shortName}`, bold: true }
                                : { text: `${immunization.trade.shortName} (${immunization.agent.shortName})`, bold: true };

      let immunizationDiseases = `\n${immunization.agent.diseases
                                 .map(disease => disease.name)
                                 .join(`, `)}`;

      let immunizationDetails = `${
                                  (immunization.lot.number) ? `\n${text.lotNumber} ${immunization.lot.number}` : ``
                                }${
                                  (immunization.isDateApproximate) ? `(${text.isDateApproximate})` : ``
                                }${
                                  (immunization.provider) ? `\n${immunization.provider}` : ``
                                }`;

      return {
        text: [
          immunizationName,
          immunizationDiseases,
          immunizationDetails
        ]
      };
    };
    /* PDF element builders ***************************************************/

    function receivedSubmission ({text, data}) {
      return {
        text: [
          text.receivedSubmission_p1_s1_f1,
          bold(data.patientName),
          text.receivedSubmission_p1_s1_f3,
          ` `,
          text.receivedSubmission_p1_s2,
          ` `,
          text.receivedSubmission_p1_s3
        ]
      };
    }

    function phuHeader ({text, data}) {
      return {
        table: {
          widths: [130, '*'],
          body: [
            [
              {
                image: data.phuPdfLogo,
                width: 130,
                height: 50,
              },
              {
                text: [
                  { text: data.phuName, fontSize: fontSize.H1 },
                  '\n',
                  data.phuPhone
                ]
              },
            ],
          ]
        },
        layout: 'noBorders'
      };
    }

    function phuConfirmationFooter ({text, data}) {
      return [
        {
          text: [
            text.phuConfirmationFooter_p1_s1,
            `\n`,
            text.phuConfirmationFooter_p1_s2
          ],
          alignment: 'center',
          fontSize: fontSize.SMALL,
        }
      ];
    }

    function phuYellowCardFooter ({text, data}) {
      return [
        {
          text: [
            text.phuYellowCardFooter_p1_s1,
            `\n`,
            text.phuYellowCardFooter_p1_s2
          ],
          alignment: 'center',
          fontSize: fontSize.SMALL,
        }
      ];
    }

    function patientNameHeading ({text, data}) {
      return {
        text: [
          {
            text: text.patientNameHeading_p1s1f1,
            fontSize: fontSize.H3
          },
          {
            text: data.patientName,
            fontSize: fontSize.H3,
            bold: true
          }
        ]
      };
    }

    function patientDemographics ({text, data}) {
      return {
        ul: [
          {
            text: [ text.patientDemographics_ul1_li1_f1, { text: text.patientGender, bold: true } ]
          },
          {
            text: [ text.patientDemographics_ul1_li2_f1, { text: `${data.patientDob} (${text.yellowCard_dateFormatText})`, bold: true } ]
          },
          // Optional fields
          (data.patientHcn)
              ? { text: [ text.patientDemographics_ul1_li3_f1, { text: data.patientHcn, bold: true } ] }
              : { text: `` },
          (data.patientOiid)
              ? { text: [ text.patientDemographics_ul1_li4_f1, { text: data.patientOiid, bold: true } ] }
              : { text: `` },
          (data.patientSchool)
              ? { text: [ text.patientDemographics_ul1_li5_f1, { text: data.patientSchool, bold: true } ] }
              : { text: `` },
          // Patient address
          (data.isAddressPopulated)
              ? {
                table: {
                  body: [
                    [
                      { text: text.patientDemographics_ul1_li6_f1 },
                      { text: data.patientAddress, bold: true, alignment: 'center' },
                    ]
                  ]
                },
                layout: 'noBorders'
              }
              : { text: `` }
        ]
      };
    }

    function contact ({text, data}) {
      let contact = [];

      let phone = {
        text: [
          { text: text.contact_ul1_li1_f1 },
          { text: data.contactPhone, bold: true },
        ]
      };

      if (data.contactExt) {
        phone.text.push(text.contact_ul1_li1_f3);
        phone.text.push({ text: data.contactExt, bold: true});
      }

      contact.push(phone);

      if (data.contactEmail) {
        contact.push({
          text: [
            { text: text.contact_ul1_li2_f1 },
            { text: data.contactEmail, bold: true }
          ]
        });
      }

      return {
        ul: contact
      };
    }

    function patientContact ({text, data}) {
      return (data.isPatientSubmitter)
                ? contact({text: text, data: data})
                : { text: `` };
    }

    function submitterContact ({text, data}) {
      return (!data.isPatientSubmitter)
                ? contact({text: text, data: data})
                : { text: `` };
    }

    function immunizationsTitle ({text, data}) {
      return {
        text: [
          {
            text: text.immunizationsTitle_p1_s1,
            fontSize: fontSize.H3
          }
        ]
      };
    }

    function newImmunizations ({text, data}) {
      let formatImmunization = (immunization) => {
        return [
          {
            text: [
              {
                text: (isAgentWithoutTrade(immunization))
                          ? immunization.agent.name
                          : immunization.trade.name,
                fontSize: fontSize.H4,
                bold: true,
              },
              `\n`,
              {
                text: formatDiseases(immunization.agent.diseases)
              },
              (immunization.lot.number)
                          ? `\n${text.lotNumber} ${immunization.lot.number}`
                          : ``,
              {
                text: (immunization.isDateApproximate) ? `\n(${text.dateIsApproximate})` : ``,
                italics: true,
              },
            ]
          }
        ]
      };

      let formatImmunizationGroup = (immunizationGroup) => {
        return [
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    text: [
                      {
                        text: (immunizationGroup.length)
                                  ? immunizationGroup[0].date
                                  : ``,
                        bold: true,
                        fontSize: fontSize.H4
                      }
                    ],
                    fillColor: '#eeeeee',
                  },
                ]
              ].concat(immunizationGroup.map(formatImmunization))
            },
            dontBreakRows: true
          },
          `\n`
        ];
      }

      return (data.newImmunizations.length)
                ? GroupsOf.immunization.byDate(data.newImmunizations)
                                       .sort(By.groupOfImmunization.firstDateAsc)
                                       .map(formatImmunizationGroup)
                : {
                    text: text.noImmunizations,
                    alignment: 'center',
                    italics: true,
                    fontSize: fontSize.H4
                  };
    }

    function patientNameHeading ({text, data}) {
      return {
        text: [
          {
            text: text.patientNameHeading_p1_s1_f1,
            fontSize: fontSize.H3
          },
          {
            text: data.patientName,
            fontSize: fontSize.H3,
            bold: true
          }
        ]
      };
    }

    function submitterNameHeading ({text, data}) {
      if (!data.isPatientSubmitter) {
        return {
          text: [
            {
              text: text.submitterNameHeading_p1_s1_f1,
              fontSize: fontSize.H3
            },
            {
              text: data.submitterName,
              fontSize: fontSize.H3,
              bold: true
            },
            `\n`
          ]
        };
      }
      else {
        return { text: `` };
      }
    }

    function submissionReferenceNumber ({text, data}) {
      return {
        text: [
          text.submissionReferenceNumber_p1_s1_f1,
          { text: data.submissionId, bold: true },
          text.submissionReferenceNumber_p1_s1_f3,
          ` `,
          text.submissionReferenceNumber_p1_s2,
        ]
      };
    }

    function reportGeneratedTime ({text, data}) {
      return {
        text: [
          text.reportGeneratedTime_p1_s1_f1,
          { text: data.reportGeneratedDate, bold: true },
          text.reportGeneratedTime_p1_s1_f3,
          { text: data.reportGeneratedTime, bold: true },
          text.reportGeneratedTime_p1_s1_f5,
        ],
        alignment: 'center'
      }
    }

    function thankYou ({text, data}) {
      return {
        text: [
          text.thankYou_p1_s1_f1,
          `\n`,
          text.thankYou_p1_s1_f2
        ],
        italics: true,
        alignment: `center`,
      };
    }

    function yellowCardTitle ({text, data}) {
      return {
        text: [
          {
            text: text.yellowCardTitle_p1_s1_f1,
            fontSize: fontSize.H3,
            bold: true
          },
          `\n`,
          {
            text: text.yellowCardTitle_p1_s1_f2
          }
        ]
      };
    }

    function yellowCardFooter({text, data}) {
      return {
        text: text.yellowCardFooter_p1_s1,
      }
    }

    function orderedDiseaseSnomeds (diseases) {
      return Object.keys(diseases)
      .map((key) => { return [key, diseases[key]] }) // get the snomeds and order
      .sort((a, b) => { return a[1] > b[1] ? 1 : -1 }) // sort on the order
      .map((item) => { return item[0] }) // return just the ordered snomeds
    }

    function ycOrder (snomed) {
      return (DISEASE_YC_ORDER[snomed])
                ? DISEASE_YC_ORDER[snomed]
                : DISEASE_YC_ORDER.DEFAULT;
    }

    function yellowCard ({text, data}) {
      let ycDiseaseSnomeds = orderedDiseaseSnomeds(DISEASE_YC_ORDER)

      let ycRows = data.retrievedImmunizations
                   .map(immunization => {
                     let diseaseSnomeds = immunization.agent.diseases.map(disease => disease.snomed);
                     let diseaseSnomedOrdinals = diseaseSnomeds.map(ycOrder);

                     return [
                       { text: immunization.date, bold: true, alignment: 'center' },
                       ...ycDiseaseSnomeds.map(snomed => {
                          let ycColumnOrdinal = ycOrder(snomed);
                          return (diseaseSnomedOrdinals.indexOf(ycColumnOrdinal) >= 0)
                                    ? { image: data.pdfCheckmark, width: 9, height: 12, alignment: 'center' }
                                    : { text: `` }
                       }),
                       formatImmunizationDetails(immunization)
                     ]
                   })

      let getSnomedImage = (snomed) => {
        return { image: data[snomed], width: 8, height: 80, alignment: 'center' };
      }

      let headerRow = [
        { text: text.yellowCard_dateFormatHeader, alignment: 'center' },
        ...ycDiseaseSnomeds.map(snomed => getSnomedImage(snomed)),
        { text: text.yellowCard_additionalInformation }
      ];

      return (data.retrievedImmunizations.length)
              ? {
                  style: 'yellowCardTable',
                  table: {
                    headerRows: 1,
                    widths: [60, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', 120],
                    body: [ headerRow, ...ycRows, ]
                  },
                }
              : {
                  text: text.noImmunizations,
                  fontSize: fontSize.H4,
                  italics: true,
                  alignment: 'center'
                };
    }

    function recommendationsTitle ({text, data}) {
      return {
        text: text.recommendationsTitle_p1_s1,
        fontSize: fontSize.H3,
        bold: true
      };
    }

    function recommendationsHeader ({text, data}) {
      return { text: text.recommendationsHeader_p1_s1 };
    }

    function recommendationsFooter ({text, data}) {
      return { text: text.recommendationsFooter_p1_s1 };
    }

    function recommendations ({text, data}) {
      return (data.recommendations.length)
                ? { ul: data.recommendations.map(r => r.disease.name) }
                : {
                    text: text.noRecommendations,
                    alignment: 'center',
                    italics: true,
                    fontSize: fontSize.H4
                  };
    }


    /* PDF document builders **************************************************/

    function createConfirmationPdfLayout (params) {
      // Instructions object to send to PdfMake on back-end.
      return {
        info: {
        	title: 'Confirmation PDF'
        },

        pageSize: 'LETTER',

        content: [
          phuHeader(params),
          `\n\n`,
          receivedSubmission(params),
          `\n`,
          submissionReferenceNumber(params),
          `\n\n`,

          patientNameHeading(params),
          `\n`,
          patientDemographics(params),
          patientContact(params),
          `\n\n`,

          immunizationsTitle(params),
          `\n`,
          newImmunizations(params),
          `\n\n`,

          submitterNameHeading(params),
          submitterContact(params),
          `\n\n`,

          thankYou(params),
        ],

        footer: phuConfirmationFooter(params),

        defaultStyle: { font: 'OpenSans', fontSize: 10 }
      };
    }

    function createYellowCardPdfLayout (params) {
      // Instructions object to send to PdfMake on back-end.
      return {
        info: {
        	title: 'Yellow Card PDF'
        },

        pageSize: 'LETTER',

        content: [
          phuHeader(params),
          `\n\n`,

          patientNameHeading(params),
          patientDemographics(params),

          `\n\n`,
          yellowCardTitle(params),
          yellowCard(params),
          yellowCardFooter(params),

          `\n\n`,
          recommendationsTitle(params),
          recommendationsHeader(params),
          recommendations(params),
          recommendationsFooter(params),
        ],

        defaultStyle: { font: 'OpenSans', fontSize: 10 },
        styles: {
          yellowCardTable: {
            fillColor: '#fff5d9',
            fontSize: 9,
            hLineWidth: 1,
            vLineWidth: 1,
            hLineColor: '#a69f8d',
            vLineColor: '#a69f8d',
          }
        }
      };
    }

    /* Pipeline functions *****************************************************/

    function openPdfInNewWindow (pdfData) {
      let pdfReader = new FileReader();
      pdfReader.onload = (pdfResult) => {
        window.open(pdfResult.target.result, `${Date.now()}`);
      };

      let pdfBlob = new Blob(
                          [pdfData],
                          {type: 'application/pdf'}
                        );

      let pdfResult = pdfReader.readAsDataURL(pdfBlob);

      return;
    }

    function getStaticImmunizationRecordData () {
      let address   = ImmunizationRecordService.getAddress();
      let patient   = ImmunizationRecordService.getPatient();
      let submitter = ImmunizationRecordService.getSubmitter();

      let patientName = `${patient.firstName}${(patient.middleName) ? ` ${patient.middleName}`: ``} ${patient.lastName}`;
      let isPatientSubmitter = submitter.relationshipToPatient === `ONESELF`;

      return {
        patientName:    patientName,
        patientGender:  patient.gender,
        patientDob:     patient.dateOfBirth,
        patientHcn:     patient.healthCardNumber,
        patientOiid:    patient.oiid,
        patientSchool:  patient.schoolOrDaycare,
        patientAddress: formatAddress(address),
        isAddressPopulated: (
          address.city
          && address.province
          && address.postalCode
        ),
        isPatientSubmitter:  isPatientSubmitter,

        submitterName:  (isPatientSubmitter) ? patientName : `${submitter.firstName} ${submitter.lastName}`,

        contactPhone:   submitter.phone1Number,
        contactExt:     submitter.phone1Ext,
        contactEmail:   submitter.email,

        reportGeneratedDate:  moment().format('YYYY-MM-DD'),
        reportGeneratedTime:  moment().format('HH:mm'),

        retrievedImmunizations: ImmunizationRecordService.getRetrievedImmunizations(),
        newImmunizations:       ImmunizationRecordService.getNewImmunizations(),
        recommendations:        ImmunizationRecordService.getRecommendations(),
      };
    }

    function appendPhuData (data) {
      return Multitenancy.getPhuKeys()
             .then((phuKeys) => {
               return $q.all({
                        phuContactPerson: $translate(phuKeys.CONTACT_PERSON_KEY),
                        phuResponseTime:  $translate(phuKeys.RESPONSE_TIME_KEY),
                        phuEmail:         $translate(phuKeys.EMAIL_KEY),
                        phuName:          $translate(phuKeys.NAME_KEY),
                        phuPhone:         $translate(phuKeys.PHONE_KEY),
                      });
             })
             .then((phuData) => { return Object.assign(data, phuData) });
    }

    function appendTokenData (data) {
      return TokenHandler
             .getTransactionToken()
             .then(token => {
               data.submissionId = token.decoded.submissionId;
               return data;
             });
    }

    function appendYellowCardDiseaseData ({data, text}) {
      let yellowCardHeaderDiseaseSnomeds = Object.keys(DISEASE_YC_ORDER)
                                           .filter(key => key !== 'DEFAULT');

      return Endpoint.batchLookupDiseases(yellowCardHeaderDiseaseSnomeds.join(`,`))
             .then(diseases => diseases
                               .reduce((diseaseMap, d) => {
                                 diseaseMap[d.snomed] = createRotatedTextDataUrl(d.name);
                                 return diseaseMap;
                               }, {
                                 DEFAULT: createRotatedTextDataUrl(text.yellowCard_other)
                               }))
             .then(diseaseNameImages => {
               return {
                 data: Object.assign(diseaseNameImages, data),
                 text: text
               };
             });
    }

    function localizePdfTextUsingData (data) {
      return $q.all({
               patientGender:                   $translate(formatGender(data.patientGender)),

               receivedSubmission_p1_s1_f1:     $translate('pdf.receivedSubmission_p1_s1_f1', data),
               receivedSubmission_p1_s1_f3:     $translate('pdf.receivedSubmission_p1_s1_f3', data),
               receivedSubmission_p1_s2:        $translate('pdf.receivedSubmission_p1_s2', data),
               receivedSubmission_p1_s3:        $translate('pdf.receivedSubmission_p1_s3', data),

               reportGeneratedTime_p1_s1_f1:  $translate('pdf.reportGeneratedTime_p1_s1_f1', data),
               reportGeneratedTime_p1_s1_f3:  $translate('pdf.reportGeneratedTime_p1_s1_f3', data),
               reportGeneratedTime_p1_s1_f5:  $translate('pdf.reportGeneratedTime_p1_s1_f5', data),

               patientNameHeading_p1_s1_f1:   $translate('pdf.patientNameHeading_p1_s1_f1', data),

               patientDemographics_ul1_li1_f1:  $translate('pdf.patientDemographics_ul1_li1_f1', data),
               patientDemographics_ul1_li2_f1:  $translate('pdf.patientDemographics_ul1_li2_f1', data),
               patientDemographics_ul1_li3_f1:  $translate('pdf.patientDemographics_ul1_li3_f1', data),
               patientDemographics_ul1_li4_f1:  $translate('pdf.patientDemographics_ul1_li4_f1', data),
               patientDemographics_ul1_li5_f1:  $translate('pdf.patientDemographics_ul1_li5_f1', data),
               patientDemographics_ul1_li6_f1:  $translate('pdf.patientDemographics_ul1_li6_f1', data),

               contact_ul1_li1_f1:  $translate('pdf.contact_ul1_li1_f1', data),
               contact_ul1_li1_f3:  $translate('pdf.contact_ul1_li1_f3', data),
               contact_ul1_li2_f1: $translate('pdf.contact_ul1_li2_f1', data),

               phuConfirmationFooter_p1_s1: $translate('pdf.phuConfirmationFooter_p1_s1', data),
               phuConfirmationFooter_p1_s2: $translate('pdf.phuConfirmationFooter_p1_s2', data),

               phuYellowCardFooter_p1_s1: $translate('pdf.phuYellowCardFooter_p1_s1', data),
               phuYellowCardFooter_p1_s2: $translate('pdf.phuYellowCardFooter_p1_s2', data),

               submissionReferenceNumber_p1_s1_f1:  $translate('pdf.submissionReferenceNumber_p1_s1_f1', data),
               submissionReferenceNumber_p1_s1_f3:  $translate('pdf.submissionReferenceNumber_p1_s1_f3', data),
               submissionReferenceNumber_p1_s2:     $translate('pdf.submissionReferenceNumber_p1_s2', data),

               reportGeneratedTime_p1_s1_f1:  $translate('pdf.reportGeneratedTime_p1_s1_f1', data),
               reportGeneratedTime_p1_s1_f3:  $translate('pdf.reportGeneratedTime_p1_s1_f3', data),
               reportGeneratedTime_p1_s1_f5:  $translate('pdf.reportGeneratedTime_p1_s1_f5', data),

               thankYou_p1_s1_f1: $translate('pdf.thankYou_p1_s1_f1', data),
               thankYou_p1_s1_f2: $translate('pdf.thankYou_p1_s1_f2', data),

               submitterNameHeading_p1_s1_f1: $translate('pdf.submitterNameHeading_p1_s1_f1', data),

               immunizationsTitle_p1_s1: $translate('pdf.immunizationsTitle_p1_s1', data),

               yellowCardTitle_p1_s1_f1: $translate('pdf.yellowCardTitle_p1_s1_f1', data),
               yellowCardTitle_p1_s1_f2: $translate('pdf.yellowCardTitle_p1_s1_f2', data),
               yellowCardFooter_p1_s1: $translate('pdf.yellowCardFooter_p1_s1', data),

               printLogoUrl: $translate('pdf.printLogoUrl', data),

               lotNumber: $translate('pdf.lotNumber', data),
               dateIsApproximate: $translate('pdf.dateIsApproximate', data),

               noImmunizations: $translate('pdf.noImmunizations', data),

               recommendationsTitle_p1_s1: $translate('pdf.recommendationsTitle_p1_s1', data),
               recommendationsHeader_p1_s1: $translate('pdf.recommendationsHeader_p1_s1', data),
               recommendationsFooter_p1_s1: $translate('pdf.recommendationsFooter_p1_s1', data),

               noRecommendations: $translate('pdf.noRecommendations', data),

               yellowCard_dateFormatHeader: $translate('pdf.yellowCard_dateFormatHeader', data),
               yellowCard_dateFormatText: $translate('pdf.yellowCard_dateFormatText', data),
               yellowCard_additionalInformation: $translate('pdf.yellowCard_additionalInformation', data),
               yellowCard_other: $translate('pdf.yellowCard_other', data)
             })
             .then((text) => {
               return {
                 text: text,
                 data: data,
               };
             });
    }

    function appendImageFilesAsBase64 ({ text: text, data: data }) {
      let pngBase64 = (imageUrl) => BlobUtil.imgSrcToDataURL(imageUrl, 'image/png', 'Anonymous');
      return $q.all({
                phuPdfLogo:   pngBase64(text.printLogoUrl),
                pdfCheckmark: pngBase64(`./img/check.png`),
              })
              .then((images) => {
                let dataWithImages = Object.assign(images, data);

                return {
                  text: text,
                  data: dataWithImages,
                };
              });
    }



/* Public *********************************************************************/

    function openConfirmationPdf () {
      Notify.publish(ICON_NOTIFICATION.PUSH_CONFIRMATION_PDF_PROGRESS);
      return $q.when(getStaticImmunizationRecordData())
             .then(appendPhuData)
             .then(appendTokenData)
             .then(localizePdfTextUsingData)
             .then(appendImageFilesAsBase64)
             .then(createConfirmationPdfLayout)
             .then(Endpoint.generatePdf)
             .then(openPdfInNewWindow)
             .then(() => {
               Notify.publish(ICON_NOTIFICATION.POP_CONFIRMATION_PDF_PROGRESS);
             })
             .catch((e) => {
               Notify.publish(ICON_NOTIFICATION.POP_CONFIRMATION_PDF_PROGRESS);
               Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_NETWORK_PROBLEM);
             });
    }

    function openYellowCardPdf () {
      Notify.publish(ICON_NOTIFICATION.PUSH_YELLOW_CARD_PDF_PROGRESS);
      return $q.when(getStaticImmunizationRecordData())
             .then(appendPhuData)
             .then(appendTokenData)
             .then(localizePdfTextUsingData)
             .then(appendYellowCardDiseaseData)
             .then(appendImageFilesAsBase64)
             .then(createYellowCardPdfLayout)
             .then(Endpoint.generatePdf)
             .then(openPdfInNewWindow)
             .then(() => {
               Notify.publish(ICON_NOTIFICATION.POP_YELLOW_CARD_PDF_PROGRESS);
             })
             .catch((e) => {
               console.error(e);
               Notify.publish(ICON_NOTIFICATION.POP_YELLOW_CARD_PDF_PROGRESS);
               Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_NETWORK_PROBLEM);
             });
    }



/* Interface ******************************************************************/

    return {
      openConfirmationPdf: openConfirmationPdf,
      openYellowCardPdf:   openYellowCardPdf,
    };

  }
}());
