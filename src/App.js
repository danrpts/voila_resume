import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FontAwesome from "react-fontawesome";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/yaml/yaml");

const frontMatterText = (
  name = "",
  street = "",
  city = "",
  phone = "",
  email = "",
  website = "",
  linkedin = ""
) => `---
name: ${name}
street: ${street}
city: ${city}
phone: ${phone}
email: ${email}
website: ${website}
linkedin: ${linkedin}
...`;
const header1Text = (text = "header 1") => {
  const t = text.trim().replace(/#+ /, "");
  return `# ${t}`;
};
const header2Text = (text = "header 2") => `#${header1Text(text)}`;
const header3Text = (text = "header 3") => `#${header2Text(text)}`;
const header4Text = (text = "header 4") => `#${header3Text(text)}`;
const header5Text = (text = "header 5") => `#${header4Text(text)}`;
const header6Text = (text = "header 6") => `#${header5Text(text)}`;
const listText = (text = "list item") => {
  const t = text.trim().replace(/\-+ /, "");
  return `- ${t}`;
};
const indentText = (text = "indent") => {
  const t = text.trim().replace(/>+ /, "");
  return `> ${t}`;
};
const italicsText = (text = "italics") => `*${text.trim()}*`;
const boldText = (text = "bold") => `**${text.trim()}**`;

function Preview(props) {
  return (
    <div className="Preview w-100 h-100">
      {!props.objectURL ? (
        "loading..."
      ) : (
        <object
          data={props.objectURL}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <iframe
            title="pdf-preview"
            src={props.objectURL}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          >
            This browser does not support PDFs. Please download the PDF to view
            it: <a href={props.objectURL}>Download PDF</a>
          </iframe>
        </object>
      )}
    </div>
  );
}

function Editor(props) {
  const options = {
    lineNumbers: true,
    lineWrapping: true,
    mode: "markdown"
  };
  return (
    <div className="Editor w-100">
      <CodeMirror
        className="h-100"
        ref={props.codeMirrorRef}
        options={options}
        value={frontMatterText(
          "Harry Potter",
          "1 Magic Loop",
          "Highlands, Scotland",
          "+0 (000) 000-0000",
          "harry@hogwarts.edu",
          "grif.hogwarts.edu/~harpot",
          "linkedin.com/in/harry"
        )}
        onChange={(editor, metadata, value) => {}}
      />
    </div>
  );
}

function Welcome(props) {
  return (
    <div className="w-100 h-100 bg-light d-flex">
      <div className="m-auto">
        <h1 className="text-center display-4">Voila!</h1>
        <p className="lead text-center">The Resume Magic Wand</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p className="lead text-center">Let{"'"}s get started!</p>
        <p className="text-center">
          <button
            className="btn btn-outline-dark btn-lg btn-block text-left"
            type="button"
            style={{ fontSize: "1rem" }}
            onClick={props.onScratchClick}
          >
            <FontAwesome
              name="i-cursor"
              fixedWidth={true}
              tag="i"
              className="mr-2"
            />Scratch
          </button>
          <small>Hammer it out one line at a time.</small>
        </p>
        <p className="text-center">
          <button
            className="btn btn-outline-dark btn-lg btn-block text-left"
            type="button"
            style={{ fontSize: "1rem" }}
          >
            <FontAwesome
              name="file-o"
              fixedWidth={true}
              tag="i"
              className="mr-2"
            />Template
          </button>
          <small>Browse our awesome templates.</small>
        </p>
        <p className="text-center">
          <button
            className="btn btn-outline-dark btn-lg btn-block text-left"
            type="button"
            style={{ fontSize: "1rem" }}
          >
            <FontAwesome
              name="folder-open-o"
              fixedWidth={true}
              tag="i"
              className="mr-2"
            />Open
          </button>
          <small>Work on your current resume.</small>
        </p>
        <hr />
        <p className="text-center">
          <small>
            <a href="#">Donate</a> | <a href="#">Learn More</a> |{" "}
            <a href="#">Contribute</a>
          </small>
        </p>
        <p>
          <small>Copyright &copy; 2017 Voila Resume.</small>
        </p>
      </div>
    </div>
  );
}

class Toolbar extends Component {
  render() {
    return (
      <div className="container-fluid bg-light fixed-bottom border border-left-0 border-bottom-0 border-right-0">
        <div
          className="btn-toolbar d-flex py-1 justify-content-between"
          role="toolbar"
          aria-label="Toolbar"
        >
          <div className="btn-group mr-2">
            <button
              type="button"
              className={"btn btn-light ".concat(
                this.props.aside.welcome ? "text-primary" : "text-muted"
              )}
              onClick={this.props.onWelcomeClick}
            >
              <FontAwesome name="life-ring" />
            </button>
            <button
              type="button"
              className={"btn btn-light ".concat(
                this.props.feedback ? "text-primary" : "text-muted"
              )}
              onClick={this.props.onFeedbackClick}
            >
              <FontAwesome name="magic" />
            </button>
            <button
              type="button"
              className={"btn btn-light ".concat(
                this.props.aside.preview ? "text-primary" : "text-muted"
              )}
              onClick={this.props.onPreviewClick}
            >
              <FontAwesome name="file-pdf-o" />
            </button>
          </div>

          <div className="btn-group mr-2">
            <button
              type="button"
              className="btn btn-light text-muted"
              onClick={this.props.onHeaderClick}
            >
              <FontAwesome name="header" />
            </button>
            <button
              type="button"
              className="btn btn-light text-muted"
              onClick={this.props.onListClick}
            >
              <FontAwesome name="list" />
            </button>
            <button
              type="button"
              className="btn btn-light text-muted"
              onClick={this.props.onIndentClick}
            >
              <FontAwesome name="indent" />
            </button>

            <button
              type="button"
              className="btn btn-light text-muted"
              onClick={this.props.onItalicsClick}
            >
              <FontAwesome name="italic" />
            </button>
            <button
              type="button"
              className="btn btn-light text-muted"
              onClick={this.props.onBoldClick}
            >
              <FontAwesome name="bold" />
            </button>
          </div>

          <div className="input-group mr-2">
            <input
              type="text"
              className="form-control"
              value={this.props.title}
              onChange={this.props.onTitleChange}
              aria-label="resume filename"
              disabled={this.props.isLoading}
            />
            <div className="input-group-btn dropup">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                disabled={this.props.isLoading}
              >
                Template
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              >
                <h6 className="dropdown-header">Favorites</h6>
                <button className="dropdown-item" type="button">
                  Houdini
                </button>
                <button className="dropdown-item" type="button">
                  Alexa
                </button>
                <h6 className="dropdown-header">Trending</h6>
                <button className="dropdown-item" type="button">
                  Geneva
                </button>
                <button className="dropdown-item" type="button">
                  Diablo
                </button>
                <button className="dropdown-item" type="button">
                  Coral
                </button>
                <h6 className="dropdown-header">Premium</h6>
                <button className="dropdown-item" type="button">
                  Arizona
                </button>
                <button className="dropdown-item" type="button">
                  Machina
                </button>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Browse All
                </a>
              </div>
            </div>
          </div>

          <div className="btn-group">
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={null}
              disabled={!this.props.hasObjectURL || this.props.isLoading}
            >
              Download
            </button>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={null}
              disabled={!this.props.hasObjectURL || this.props.isLoading}
            >
              Publish
              <FontAwesome
                name="cloud-upload"
                fixedWidth={true}
                tag="i"
                className="ml-2"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: false,
      objectURL: null,
      aside: { welcome: true, preview: false },
      title: "untitled.md"
    };
  }

  handleWelcomeClick = event => {
    const { welcome } = this.state.aside;
    this.setState({
      aside: {
        welcome: !welcome,
        preview: false
      }
    });
  };

  handleFeedbackClick = event => {
    const feedback = this.state.feedback;

    this.setState({
      feedback: !feedback
    });
  };

  handlePreviewClick = _ => {
    const { preview } = this.state.aside;

    this.setState({
      aside: {
        welcome: false,
        preview: !preview
      }
    });

    // if toggleing preview on or TODO text has changed
    if (!preview) {
      const doc = this.codeMirrorRef.editor.getDoc();

      const value = doc.getValue();

      const promise = convert(value);

      promise
        .then(objectURL => {
          this.setState({
            objectURL
          });
        })
        .catch(() => {
          // TODO do something here
        });
    }
  };

  handleScratchClick = _ => {
    this.setState({
      feedback: true,
      aside: { welcome: false }
    });
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleHeaderClick = _ => {
    const doc = this.codeMirrorRef.editor.getDoc();

    const numberReplacementsMade = replaceSelections(doc, header1Text);

    if (numberReplacementsMade > 0) return;

    const value = doc.getValue();
    doc.setValue(`${value}\n${header1Text()}`);
  };

  handleListClick = _ => {
    const doc = this.codeMirrorRef.editor.getDoc();

    const numberReplacementsMade = replaceSelections(doc, listText);

    if (numberReplacementsMade > 0) return;

    const value = doc.getValue();
    doc.setValue(`${value}\n${listText()}`);
  };

  handleIndentClick = _ => {
    const doc = this.codeMirrorRef.editor.getDoc();

    const numberReplacementsMade = replaceSelections(doc, indentText);

    if (numberReplacementsMade > 0) return;

    const value = doc.getValue();
    doc.setValue(`${value}\n${indentText()}`);
  };

  handleItalicsClick = _ => {
    const doc = this.codeMirrorRef.editor.getDoc();

    const numberReplacementsMade = replaceSelections(doc, italicsText);

    if (numberReplacementsMade > 0) return;

    const value = doc.getValue();
    doc.setValue(`${value}\n${italicsText()}`);
  };

  handleBoldClick = _ => {
    const doc = this.codeMirrorRef.editor.getDoc();

    const numberReplacementsMade = replaceSelections(doc, boldText);

    if (numberReplacementsMade > 0) return;

    const value = doc.getValue();
    doc.setValue(`${value}\n${boldText()}`);
  };

  render() {
    return (
      <div className="App w-100 h-100">
        <header>
          <nav className="navbar navbar-light bg-white border border-top-0 border-right-0 border-left-0">
            <a className="navbar-brand" href="/">
              <img
                src={logo}
                width="30"
                height="30"
                className="App-logo"
                alt="logo"
              />
              <span className="navbar-text">
                <span className="">voila</span>
                <span className="font-weight-bold">resume</span>
              </span>
            </a>
            <div className="btn-group" />
          </nav>
        </header>
        <div className="container-fluid">
          <div className="row border border-top-0 border-right-0 border-left-0">
            <main className="col p-0">
              <Editor
                codeMirrorRef={el => {
                  this.codeMirrorRef = el;
                }}
              />
            </main>
            {this.state.aside.welcome ? (
              <aside className="col p-0 border border-top-0 border-right-0 border-bottom-0">
                <Welcome onScratchClick={this.handleScratchClick} />
              </aside>
            ) : this.state.aside.preview ? (
              <aside className="col p-0 border border-top-0 border-right-0 border-bottom-0">
                <Preview objectURL={this.state.objectURL} />
              </aside>
            ) : null}
          </div>
        </div>
        <Toolbar
          feedback={this.state.feedback}
          aside={this.state.aside}
          onWelcomeClick={this.handleWelcomeClick}
          onFeedbackClick={this.handleFeedbackClick}
          onPreviewClick={this.handlePreviewClick}
          onHeaderClick={this.handleHeaderClick}
          onListClick={this.handleListClick}
          onIndentClick={this.handleIndentClick}
          onItalicsClick={this.handleItalicsClick}
          onBoldClick={this.handleBoldClick}
          title={this.state.title}
          onTitleChange={this.handleTitleChange}
          hasObjectURL={!!this.state.objectURL}
        />
      </div>
    );
  }
}

function replaceSelections(doc, textTransform) {
  // short circuit for no selections
  if (!doc.somethingSelected()) return 0;

  let selections = doc.getSelections();

  // split each selection into its lines
  selections = selections.map(selection => selection.split("\n"));

  selections = selections.map(selection =>
    // ignore empty lines (result of user accidental tail selection)
    // TODO how to handle mid line selections?
    selection.map(line => (line === "" ? "" : textTransform(line)))
  );

  // join each line back into a selection
  selections = selections.map(selection => selection.join("\n"));

  doc.replaceSelections(selections, "around");

  // reutrn number of replacements made
  return selections.length;
}

async function convert(body) {
  try {
    const headers = new Headers({
      Accepts: "application/pdf",
      "Content-Type": "text/plain"
    });

    const init = {
      method: "POST",
      headers,
      body,
      mode: "cors",
      cache: "no-cache"
    };

    const response = await window.fetch("/api/convert", init);

    if (response.ok) {
      const blob = await response.blob();
      return window.URL.createObjectURL(blob);
    } else {
      throw new Error({ status: response.status });
    }
  } catch (error) {
    console.dir(error.message);
  }
}

export default App;
