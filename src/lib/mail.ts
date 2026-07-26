import Mailjet from "node-mailjet";



const mailjet = Mailjet.apiConnect(

  process.env.MAILJET_API_KEY!,

  process.env.MAILJET_SECRET_KEY!

);







export async function sendMagicLinkEmail({

  email,

  url,

}:{

  email:string;

  url:string;

}) {



  await mailjet

    .post(

      "send",

      {

        version:"v3.1",

      }

    )

    .request({

      Messages:[

        {

          From:{

            Email:

              process.env.MAIL_FROM!

              .match(

                /<(.+)>/

              )?.[1]

              ??

              process.env.MAIL_FROM,

            Name:

              "FormFlow",

          },


          To:[

            {

              Email:email,

            },

          ],



          Subject:

            "Sign in to FormFlow",



          HTMLPart:`

            <div

              style="
                font-family:Arial,sans-serif;
                max-width:600px;
                margin:auto;
                padding:20px;
              "

            >


              <h2>

                Sign in to FormFlow

              </h2>



              <p>

                Click the button below to sign in.

              </p>




              <p>

                <a

                  href="${url}"

                  style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#111827;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:8px;
                  "

                >

                  Sign In

                </a>


              </p>




              <p>

                This link will expire in a few minutes.

              </p>



              <p>

                If you didn't request this email,
                you can safely ignore it.

              </p>



            </div>

          `,

        },

      ],

    });

}