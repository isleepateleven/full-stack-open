```mermaid
sequenceDiagram

    participant browser
    participant server

    Note right of browser: User writes a note in the text field and clicks "Save"
     browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created (Success)
    deactivate server

    Note right of browser: JavaScript adds the new note to the list without reloading the page

```
