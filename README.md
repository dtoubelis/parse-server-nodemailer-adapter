# parse-server-simple-ses-adapter
Used to send Parse Server password reset and email verification emails with Nodemailer

## Usage:

```js
// ...

let secure = (env.SMTP_REQUIRE_SSL || "no").startsWith("y");
let requireTls = (env.SMTP_REQUIRE_STARTTLS || "no").startsWith("y");
if (secure && requreTls) {
  log.warning("STARTTLS cannot be used whjen SSL is enabled.");
  requireTls = false;
}

let transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT || 587,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD
  },
  secure: secure,
  requireTls: requireTls,
  pool: true,
  logger: bunyan.createLogger({name: 'nodemailer'})
});


const server = new ParseServer({

  // ...

  appName: 'My app',
  publicServerURL: 'http://localhost:1337/parse',
  verifyUserEmails: true, // Enable email verification
  emailAdapter:
    module: "parse-server-nodemailer-adapter",
    options: {
      transporter: transporter,
      fromAddress: 'your-email@postmark-sender-signatures.com'
    }
  }),
});

// ...
```

## License
MIT License. See [LICENSE](./LICENSE) file for details.
