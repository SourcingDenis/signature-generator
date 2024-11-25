import { Handler } from '@netlify/functions';
import { SignatureData, StyleConfig } from '../../../src/types';

const generateHTML = (data: SignatureData, config: StyleConfig): string => {
  const {
    name,
    title,
    company,
    email,
    phone,
    website,
    logo,
    location,
    socials
  } = data;

  const { primaryColor, textColor, backgroundColor } = config;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
          
          .signature {
            font-family: 'Inter', sans-serif;
            color: ${textColor};
            background-color: ${backgroundColor};
            padding: 20px;
            max-width: 600px;
            border-radius: 8px;
          }
          
          .signature a {
            color: ${primaryColor};
            text-decoration: none;
          }
          
          .signature a:hover {
            text-decoration: underline;
          }
          
          .signature img {
            border-radius: 50%;
            width: 80px;
            height: 80px;
            object-fit: cover;
          }
          
          .social-links a {
            margin-right: 10px;
          }
        </style>
      </head>
      <body>
        <div class="signature">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${logo ? `
                <td style="padding-right: 20px; vertical-align: top;">
                  <img src="${logo}" alt="${name}" style="border-radius: 50%;">
                </td>
              ` : ''}
              <td style="vertical-align: top;">
                <h3 style="margin: 0 0 5px; color: ${primaryColor}; font-size: 18px; font-weight: 600;">
                  ${name}
                </h3>
                <p style="margin: 0 0 10px; color: ${textColor}; font-size: 14px;">
                  ${title}${company ? ` at ${company}` : ''}
                </p>
                ${email ? `
                  <p style="margin: 0 0 5px; font-size: 14px;">
                    <a href="mailto:${email}">${email}</a>
                  </p>
                ` : ''}
                ${phone ? `
                  <p style="margin: 0 0 5px; font-size: 14px;">${phone}</p>
                ` : ''}
                ${website ? `
                  <p style="margin: 0 0 5px; font-size: 14px;">
                    <a href="${website}">${website.replace(/^https?:\/\//, '')}</a>
                  </p>
                ` : ''}
                ${location ? `
                  <p style="margin: 0 0 10px; font-size: 14px;">${location}</p>
                ` : ''}
                <div class="social-links" style="margin-top: 10px;">
                  ${Object.entries(socials)
                    .filter(([_, url]) => url)
                    .map(([platform, url]) => `
                      <a href="${url}" style="color: ${primaryColor};">
                        ${platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    `).join('')}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { data, config } = JSON.parse(event.body || '{}');
    
    if (!data || !config) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required data' }),
      };
    }

    const html = generateHTML(data, config);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}