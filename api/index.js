const execa = require("execa");
const temp = require("temp").track();
const { promisify } = require("util");
const mkdir = callback => temp.mkdir("pandoc", callback);
temp.mkdira = promisify(mkdir);
const { resolve, join, dirname } = require("path");
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
  let tempDir;

  try {
    tempDir = await temp.mkdira();
  } catch (error) {
    console.error(`temp error: ${error}`);
  }

  // can be a relative path or absolute
  const tempFile = join(tempDir, "resume.pdf");

  const templates = join(__dirname, "templates");

  const args = [
    "--standalone",
    "--from=markdown",
    "--to=latex",
    `--output=${tempFile}`,
    `--data-dir=${tempDir}`,
    `--template=${join(templates, "mcdowell.tex")}`,
    "--latex-engine=lualatex"
  ];

  const opts = {
    input: ctx.request.body,
    env: {
      TEXINPUTS: `.:${templates}/:`
    }
  };

  try {
    const { stdout, stderr } = await execa("pandoc", args, opts);

    // TODO when does this occur? bad args
    if (stderr !== "") {
      throw new Error(stderr);
    }
  } catch (error) {
    console.error(`pandoc error: ${error}`);
  }

  ctx.type = "application/pdf";
  ctx.body = createReadStream(tempFile);
}

server.use(route.post("/api/convert", convert));

server.listen(4000, () => {
  console.log("koa listening on http://localhost:4000");
});
