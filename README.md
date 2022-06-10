Displaying a Disasters Image Classification Model Results from a Restful API
==============================
This is a supplementary submission of **final paper** for the **CIS726** course.

It contains the code necessary to issue a RESTful API request by uploading an image, and classify it to a disaster type with XAI
annotations.

To view a live example, [click here](https://tariqshaban.github.io/disaster-classification-with-xai-visualizer/).

Getting Started
------------
Clone the project from GitHub

`$ git clone https://github.com/tariqshaban/disaster-classification-with-xai-visualizer.git`

The project is an implementation
of [disaster-classification-with-xai](https://github.com/tariqshaban/disaster-classification-with-xai) repository

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

API setup
------------
The project mandates a working API to retrieve the results, clone the following project from GitHub and
setup a local server, Python must be installed since it operates on FastAPI.
`$ git clone https://github.com/tariqshaban/disaster-classification-with-xai-server.git`

Configure `api-endpoint.service.ts` properties as necessary to identify the API endpoints.

Make sure to handle the CORS policy if the server is running locally.

Development server
------------
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

--------
