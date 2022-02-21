## Demo

https://ortex-login-task.vercel.app/

## Screenshots

![image](https://res.cloudinary.com/myproyects/image/upload/v1645383079/proyects/all-screens-min_ooige0.webp)
![image](https://res.cloudinary.com/myproyects/image/upload/v1645383082/proyects/descktop-min_qeev0a.webp)
![image](https://res.cloudinary.com/myproyects/image/upload/v1645383078/proyects/mobile-min_fo6pxo.webp)
![image](https://res.cloudinary.com/myproyects/image/upload/v1645383077/proyects/tablet-min_rxncei.webp)

![image](https://res.cloudinary.com/myproyects/image/upload/v1645383078/proyects/lighthouse-min_omekxw.webp)

## Run Locally

Clone the project

```bash
  git clone https://github.com/BrisaDiaz/ORTEX_technical_task.git
```

Go to the project directory

```bash
  cd ORTEX_technical_task
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev

  #or

  npm run build

  npm start

```

## Api endpoints

Login: http://localhost:3000/api/login  
Reset password: http://localhost:3000/api/resetPassword

- Error case user = unregistredUser@email.com

- Success case user = any other valid email

## libraries

Next js (React)
Cypress

## Features

- Lighthouse github pipeline.
- Integration tests.
- Customizable form with validation.
- Accessible components.
- Push notification.
- Loading indicators.
- Websocket feed with the latest EUR/USD exchange rate.

## Folder structure

.  
├── components (components folder)  
├── interfaces.ts (common typescript interfaces)  
├── lighthouserc.js (lighthous config)  
├── cypress (integration tests)  
├── hooks (custom hooks)  
├── styles (pages level styles)  
├── public (static assets)  
├── mappers (data mappers)  
├── .github (workflows)  
└── utils (utility snippets)
