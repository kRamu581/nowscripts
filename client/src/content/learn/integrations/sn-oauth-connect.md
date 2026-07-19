ServiceNow – OAuth application connect

-   Go thorough third-party documentation properly.
-   Register Application :
    -   First, register an application to the third party portal with a redirect URL: https://<**instance**\>.service-now.com/oauth\_redirect.do
-   Once You Register you will get the client id & client secret, save this details
-   Get Authorisation URL & Token URL
    -   Get Authorization URL and Token URL from third party. These details are normally available in third-party documentation. Example URL sharing below.
    -   Authorization URL: https://<**thirdpart-server**\>/oauth/authorize
    -   Token URL: https://<**thirdpart-server**\>/oauth/token
-   Create a record in Service-Now with below details:
    -   Go to application registry under system oauth. Click new “Connect to a third party OAuth Provider”.
    -   Provide Name, Client ID , Client Secrete, Default Grand Type: Authrozation Code, Send Creadentials: As a basic authentication header.
    -   Once you save application registry will be created and OAuth Entry profile will be created.
    -   If their is scope define in by application add this to OAuth Entry Profile.
-   Create Rest Message with all detials like end point header. Select authenetication as OAUTH and Select OAuth profile that created in last step.
-   Got to Rest Message Default Resorces and click get Oauth Token
-   You will redicet to third-party, once you put creadentials you will recive a token, ypu can use this token as a creadentials untill its expires.
-   You can also check save toke and expiry date in **Manage Toke \[oauth\_credential\]** table.
-   Now you can click test button in rest resorce to check its working or not, but remember it will hit to third party server so please use third party dev endpoint.