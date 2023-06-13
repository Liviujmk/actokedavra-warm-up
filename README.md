# Mantine + Vite template

## Mind MAP

- ### 1. Base Project Setup

  - Clone Vite + Mantine template from [mantine/mantine-vite-template](https://github.com/mantinedev/vite-template)
  - Add `react-router-dom` for routing
  - Add `json-server` for ACTORS API
  - Add `redux` for state management
  - Add `redux-toolkit` for redux toolkit

- ### 2. Setting Project Structure

  - Create `common` folder for common data whithin app
    - `constants` folder for global app constants
    - `store` folder for app store
  - Create `pages` folder for app pages
  - Create `router` folder for app router
  - Create `layouts` folder for app layouts
  - Create `features` folder for features (will be only `actors feature`)
    - `components` folder for components
    - `api` folder for api calls with redux-toolkit
    - `types` folder for feature types and interfaces
    - `utils` folder for feature utils
    - `constants` folder for feature constants
    - `store` folder for feature store