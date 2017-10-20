const execa = require("execa");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const { createReadStream } = require("fs");
const route = require("koa-route");
const static = require("koa-static");
const server = new Koa();

server.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

server.use(logger());

server.use(
  bodyParser({
    enableTypes: ["text"]
  })
);

async function convert(ctx) {
  const args = [
    "-s",
    "-f",
    "markdown",
    "-t",
    "latex",
    "-o",
    "resume.pdf",
    "--template",
    "template.tex",
    "--latex-engine",
    "xelatex"
  ];

  const opts = { input: ctx.request.body };

  try {
    const { stdout, stderr } = await execa("pandoc", args, opts);

    if (stderr !== "") {
      throw new Error(stderr);
    }
  } catch (error) {
    console.error(`${error}`);
  }

  ctx.type = "application/pdf";
  ctx.body = createReadStream("./resume.pdf");
}

server.use(route.post("/api/convert", convert));

server.listen(4000, () => {
  console.log("koa listening on http://localhost:4000");
});
