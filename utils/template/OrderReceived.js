import { LOGO, SERVER_URL, URI_SITE, ADDRESS } from "../constant.js";
import moment from "moment";

export const ORDER_RECEIVED_TEMPLATE = ({ order }) => {
  const HTMLTEXT = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title>Email Receipt</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style type="text/css">
        /**
     * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
     */
        @media screen {
          @font-face {
            font-family: "Source Sans Pro";
            font-style: normal;
            font-weight: 400;
            src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
              url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
                format("woff");
          }
  
          @font-face {
            font-family: "Source Sans Pro";
            font-style: normal;
            font-weight: 700;
            src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
              url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
                format("woff");
          }
        }
  
        /**
     * Avoid browser level font resizing.
     * 1. Windows Mobile
     * 2. iOS / OSX
     */
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }
  
        /**
     * Remove extra space added to tables and cells in Outlook.
     */
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
  
        /**
     * Better fluid images in Internet Explorer.
     */
        img {
          -ms-interpolation-mode: bicubic;
        }
  
        /**
     * Remove blue links for iOS devices.
     */
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
  
        /**
     * Fix centering issues in Android 4.4.
     */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
  
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
  
        /**
     * Collapse table borders to avoid space between cells.
     */
        table {
          border-collapse: collapse !important;
        }
  
        a {
          color: #1a82e2;
        }
  
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
      </style>
    </head>
    <body style="background-color: #f1f1f1">
      <!-- start preheader -->
      <div
        class="preheader"
        style="
          display: none;
          max-width: 0;
          max-height: 0;
          overflow: hidden;
          font-size: 1px;
          line-height: 1px;
          color: #fff;
          opacity: 0;
        "
      >
      Your order #${order.order_id} has been delivered successfully.  
      </div>
      <!-- end preheader -->
  
      <!-- start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- start logo -->
        <tr>
          <td align="center" bgcolor="#f1f1f1">
            <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px">
                  <a
                    href=${URI_SITE}
                    target="_blank"
                    style="display: inline-block"
                  >
                    <img
                      src="${LOGO}"
                      alt="Logo"
                      border="0"
                      width="48"
                      style="
                        display: block;
                        width: 148px;
                        max-width: 148px;
                        min-width: 148px;
                      "
                    />
                  </a>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
        </tr>
        <!-- end logo -->
  
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#f1f1f1">
            <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 36px 24px 0;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    border-top: 3px solid #d4dadf;
                  "
                >
                  <h1
                    style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 700;
                      letter-spacing: -1px;
                      line-height: 48px;
                    "
                  >
                  Hi ${order.customer.name},
                  </h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
        </tr>
        <!-- end hero -->
  
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#f1f1f1">
            <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <!-- start copy -->
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 24px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    line-height: 24px;
                  "
                >
               

             
                  <p style="margin: 0">
                  You order #${order.order_id} has been delivered successfully. Thank you for choosing us. You can check the status by clicking on the link below. 
                  </p>
                  <p>  <a target="_blank" href="${URI_SITE}my-account"> Check Order  </a> </p> 
                
                </td>
              </tr>
              <!-- end copy -->
  
              
              <!-- end reeipt table -->
            </table>
            <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
        </tr>
        <!-- end copy block -->
  
        <!-- start receipt address block -->
        <tr>
          <td align="center" bgcolor="#f1f1f1" valign="top" width="100%">
            <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
           
            <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
        </tr>
        <!-- end receipt address block -->
  
        <!-- start footer -->
        <tr>
          <td align="center" bgcolor="#f1f1f1" style="padding: 24px">
            <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <!-- start permission -->
              <tr>
                <td
                  align="center"
                  bgcolor="#f1f1f1"
                  style="
                    padding: 12px 24px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    line-height: 20px;
                    color: #666;
                  "
                >
                  <p style="margin: 0">
                  We do not demand your banking and credit card details verbally or telephonically. Please do not divulge your details to fraudsters and imposters falsely claiming to be calling on our behalf.
                  </p>
                </td>
              </tr>
              <!-- end permission -->
  
              <!-- start unsubscribe -->
              <tr>
                <td
                  align="center"
                  bgcolor="#f1f1f1"
                  style="
                    padding: 12px 24px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    line-height: 20px;
                    color: #666;
                  "
                >
                 
                  <p style="margin: 0">
                    ${ADDRESS}
                  </p>
                </td>
              </tr>
              <!-- end unsubscribe -->
            </table>
            <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
        </tr>
        <!-- end footer -->
      </table>
      <!-- end body -->
    </body>
  </html>
  `;

  return HTMLTEXT;
};
