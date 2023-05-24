FROM mcr.microsoft.com/playwright:v1.30.0-focal

WORKDIR /e2e

RUN npx playwright install --with-deps chromium
RUN npx playwright install --with-deps firefox

COPY package*.json /e2e/

RUN npm install

USER pwuser
COPY --chown=pwuser:pwuser . /e2e/
