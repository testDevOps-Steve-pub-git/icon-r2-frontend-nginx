Multitenancy in ICON v2
=======================

Multitenancy in the ICON front-end facilitates each Publich Health Unit (PHU) to have a semi-customized version of the ICON application, while keeping a single code-base.

This is accomplished when the ICON front-end app is served to the client. NGINX is configured to effectively "replace" the contents of ```/client/app/phu``` with the contents of an appropriate folder from ```/client/multitenancy/<PHU acronym>```. The name of the multitenancy sub-directory used is matched from the sub-domain used to access the ICON front-end application.

For example: accessing ```https://tph.icon-instance.tld``` will cause NGINX to use the contents of ```/client/multitenancy/tph```, instead of ```/client/app/phu```, because of the sub-domain ```tph```.

*NOTE: during development, a locally run copy of the ICON front-end will refer to multitenancy data in ```/client/app/phu```, unless the development environment is using the correct NGINX configuration.*


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
