Multitenancy in ICON v2
=======================

Multitenancy in the ICON front-end facilitates each Public Health Unit (PHU) to have a semi-customized version of the ICON application, while keeping a single code-base.

This is accomplished when the ICON front-end app is served to the client. NGINX is configured to effectively "replace" the contents of ```src/phu``` with the contents of an appropriate folder from ```src/multitenancy/<PHU acronym>```. The name of the multitenancy sub-directory used is matched from the sub-domain used to access the ICON front-end application.

For example: accessing ```https://tph.icon-instance.tld``` will cause NGINX to use the contents of ```src/multitenancy/tph```, instead of ```src/phu```, because of the sub-domain ```tph```.

To add a new PHU folder to the multitenancy sub-directory:
----------------------------------------------------------
1. Duplicate any one of the existing PHU folders in the multitenancy sub-directory
2. Rename the new folder to match the new PHU's acronym
3. Obtain the header/PDF logo images for the PHU
    1. Rename the header logo to ```logo-en.png``` and replace the existing file in the new PHU folder
    2. Rename the PDF logo to ```pdf-logo-en.png``` and replace the existing file in the new PHU folder
4. Modify the image scaling size values in the ```phu.css``` file
    1. Find the width of the header logo (```logo-en.png```) in pixels
    2. Divide that value by 2.6 and round to the nearest integer
    3. Replace the width value with the calculated value in the code shown below:

    ```
    @media (min-width: 1px) {
      /* Scale the logo/brand image down by a factor of 2.6 */
      #icon-phu-header-brand img {
        width: 36px; /* Width will vary for each PHU. */
        height: 40px; /* Height should NOT be changed. */
      }
    }
    ```

    4. Divide the original width of the logo by 2 and round to the nearest integer
    5. Replace the width value with the calculated value in the code shown below:

    ```
    @media (min-width: 767px) {
      */ Scale the logo/brand image down by a factor of 2.0 /*
      #icon-phu-header-brand img {
        width: 47px; */ Width will vary for each PHU. /*
        height: 52px; */ Height should NOT be changed. /*
      }
    }
    ```

5. Replace the color theme values in the ```phu.css``` file
    1. Replace the ```icon-phu-header``` ```background-color``` value with the main background color and
    the ```border-color``` value with the color for the bottom banner accent:

    ```
    #icon-phu-header {
      background-color: #00578d !important;
      border-color: #e6d1ac !important;
    }
    ```

    2. Replace the ```background-color``` values for the ```icon-phu-footer```
      and ```icon-progress-bar-container``` elements with the footer color as shown below:

    ```
    #icon-phu-footer {
      background-color: #eeeeee !important;
    }
    #icon-progress-bar-container {
      background-color: #eeeeee !important;
    }
    ```
6. Edit the comment at the top of the ```phu.css``` file to display the name of the new PHU
   instead of the old one, like in this example:

    ```
    /******************************************************************************
     *                                                                            *
     *    Grey Bruce custom PHU rules ONLY in this stylesheet.                    *
     *    ~~~~~~~~~~                                                              *
     ******************************************************************************/
    ```

7. Edit information in the ```phu.json``` file
    1. Change the values of the ```NAME_KEY```, ```PHONE_KEY```, ```EMAIL_KEY```, ```CONTACT_PERSON_KEY```
      , ```ADDRESS_KEY```, ```RESPONSE_TIME_KEY```, ```PRIVACY_LINK_KEY```, ```TOC_LINK_KEY```,
      and ```WEBSITE_KEY``` attributes by removing the old PHU acronym and replacing it with
      the new one (in all uppercase letters):
        * e.g., from ```MULTITENANCY.HPH.PHU_NAME``` to ```MULTITENANCY.KFLA.PHU_NAME```
    2. Change the values of the ```ICON_PHU_ACRONYM``` to match the new PHU's acronym
      (in all lowercase letters)
    3. Change the ```PHIX_PHU_NAME``` and ```PHIX_PHU_CODE``` to match the full name and PHU code
      for the new PHU
8. Edit the ```nojs.html``` file to remove all references to the prior PHU and replace them with
    the name of the new PHU. If there is any PHU specific template for this file, enter that
    as well
9. If the PHU has a template other than the default for the ```aupEN.template.html``` or ```aupFR.template.html```
   files, replace the contents of those files with the template. If the PHU is using the default template, those files should
   look like this:
   * ```aupEN.template.html```:
   ```
   <!-- Replace include tag below with custom markup for PHUs with customized / non-standard AUPs-->
   <div ng-include="'../multitenancy/defaultAupEN.template.html'"></div>
   ```
   * ```aupFR.template.html```:
   ```
   <!-- Replace include tag below with custom markup for PHUs with customized / non-standard AUPs-->
   <div ng-include="'../multitenancy/defaultAupFR.template.html'"></div>
   ```
10. Navigate to ```src/services/localization/``` and create a new multitenancy entry in ```dictionary_EN.json``` and ```dictionary_FR.json```
    1. Search the file for the term "multitenancy" to navigate to the section containing
      multitenancy data
    2. Insert a new entry containing the necessary data in the same format as in the
      example shown below:

    ```
      "GBHU": {
        "PHU_NAME": "Grey Bruce Health Unit",
        "PHU_PHONE": "519-376-9420 or 1-800-263-3456",
        "PHU_EMAIL": "immunization@publichealthgreybruce.on.ca",
        "PHU_CONTACT_PERSON": "a Grey Bruce Public Health Unit nurse",
        "PHU_ADDRESS": "<strong>Privacy Officer</strong><br aria-hidden=\"true\" />Grey Bruce Health Unit<br aria-hidden=\"true\" />101 17th Street East<br aria-hidden=\"true\" />Owen Sound,  Ontario<br aria-hidden=\"true\" />N4K 0A5",
        "PHU_RESPONSE_TIME": "1 week",
        "PHU_PRIVACY_LINK": "https://www.publichealthgreybruce.on.ca",
        "PHU_TOC_LINK": "https://www.publichealthgreybruce.on.ca/Terms-of-use",
        "PHU_WEBSITE": "https://www.publichealthgreybruce.on.ca/"
      },
    ```
11. Add the new PHU to the table in this ```README.md``` file (see below)


Testing multitenancy
--------------------
*NOTE: during development, a locally run copy of the ICON front-end will refer to multitenancy data in ```src/phu```, unless the development environment is using the correct NGINX configuration.*

*All examples are shown using the "hph" PHU. The file paths will differ for testing other PHUs*
1. Open to ```src/components/index/phuHeader/phuHeader/phuHeader.template.html``` and
    change the img src value to point directly to the PHU's logo:

    ```
    <div id="icon-phu-header-brand" class="pull-left">
      <img src="./multitenancy/hph/logo-en.png" alt="{{$ctrl.multitenancy.NAME_KEY | translate}}" />
    </div>
    ```

2. Open ```index.html``` and change the path of the ```phu.css``` import to point directly to
    the PHU's css file:

    ```
    <!-- Custom CSS -->
    <link rel="stylesheet" href="./css/icon-screen.css" />
    <link rel="stylesheet" href="./css/phu-screen.css" />
    <link rel="stylesheet" href="./multitenancy/hph/phu.css" />
    ```

3. Navigate to ```src/services/localization``` and modify the pdf image paths for
    the ```dictionary_EN.json``` and ```dictionary_FR.json``` files
    1. Search for ```printLogoUrl``` in each file to find the correct LOGIN_PIN_PLACEHOLDER
    2. Change the image path to point directly to the PHU's logo:

    ```
    "printLogoUrl": "./multitenancy/hph/pdf-logo-en.png",
    ```

4. Open ```src/services/Multitenancy.service.js``` and add a new testing line, or uncomment
    an old one, to reassign the ```DEFAULT_RELATIVE_PATH_TO_PHU_JSON``` value to point
    directly to the PHU's ```phu.json``` file:

    ```
    var DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './phu/phu.json';
    // Uncomment overrides below to test different multitenancy configurations...
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/gbhu/phu.json';
    ```

Reference of PHU Codes and Official Names
-----------------------------------------

| PHU     | ID    | Name                      |
|---------|------:|:-------------------------:|
| aph     | 33    | Algoma Public Health Unit |
| bchu    | 15    | Brant County Health Unit |
| ckphu   | 17    | Chatham-Kent Health Unit |
| drhd    | 57    | Durham Region Health Department |
| eohu    | 18    | Eastern Ontario Health Unit |
| esthu   | 35    | Elgin-St. Thomas Health Unit |
| gbhu    |  6    | Grey Bruce Health Unit |
| hnhu    | 34    | Haldimand-Norfolk Health Unit |
| hkpr    | 32    | Haliburton, Kawartha, Pine Ridge District Health Unit |
| hrhd    | 27    | Halton Region Health Department |
| hph     | 20    | Hamilton Public Health & Social Services |
| hpechu  | 13    | Hastings and Prince Edward Counties Health Unit |
| hchu    |  9    | Huron County Health Unit |
| kfla    | 22    | Kingston, Frontenac and Lennox & Addington Health Unit |
| lph     | 31    | Lambton Health Unit |
| lgl     | 16    | Leeds, Grenville and Lanark District Health Unit |
| mlhu    | 23    | Middlesex-London Health Unit |
| nrph    | 41    | Niagara Region Public Health Department |
| nbpsdhu | 26    | North Bay Parry Sound District Health Unit |
| nwhu    | 21    | Northwestern Health Unit |
| oph     | 28    | Ottawa Public Health |
| ocph    | 11    | Oxford County Public Health |
| peel    | 14    | Peel Public Health |
| pdhu    | 36    | Perth District Health Unit |
| pcchu   | 30    | Peterborough County-City Health Unit |
| po      | 54    | Porcupine Health Unit |
| rowph   | 56    | Region of Waterloo, Public Health |
| re      | 29    | Renfrew County and District Health Unit |
| smdhu   | 12    | Simcoe Muskoka District Health Unit |
| sdhu    | 40    | Sudbury and District Health Unit |
| tbdhu   | 46    | Thunder Bay District Health Unit |
| timhu   | 24    | Timiskaming Health Unit |
| tph     | 55    | Toronto Public Health |
| wdgph   | 19    | Wellington-Dufferin-Guelph Health Unit |
| wechu   | 58    | Windsor-Essex County Health Unit |
| yrphu   | 25    | York Region Public Health Services |

*FROM: "Panorama Immunization Connect Ontario (ICON) -- HL7 FHIR Implementation Guide" (v2.0.0, 2016/02/09)*

*Last Updated: 2017-06-02 (v2.34.1)*
