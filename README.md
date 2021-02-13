# Typp-e

> Tip: have the command file ready

### Usage:

#### Docker way:

- Prerequisites:
    - Docker daemon;
    - make;

- Running:
    - Run `make init`;

    - `make run` or `make test`;
        - If run:
            - The terminal will prompt a request to inputs file path;
            - Once the file is informed wait for the magic happens;
        - If test: just wait for the results;

#### Hosted way:

- Prerequisites:
    - NodeJS;
    - yarn;

- Running:
    - Run `yarn`;
    - Run `yarn build`;
    - Run `yarn start --input=path_of_the_input_file` or `yarn test`;

> Warn: tested on the following node versions: 12.20, 14.11 and 15.4.
