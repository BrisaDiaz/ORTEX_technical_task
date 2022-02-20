## Demo

https://ortex-login-task.vercel.app/

## Screenshots

![image](https://drive.google.com/uc?export=view&id=1VactRy4O_Cs6zvHes3B5SJsP3BByabWE)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
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

## JavaScript framework

Next js

## Additional libraries

No additional libraries

## Features

- Customizable form with validation.
- Accessibility.
- Push notification.
- Loading indicators.
- Websocket feed with the latest EUR/USD exchange rate.

## Folder structure

.  
├── components (Components folder)  
│ └── Component  
│ ├── index.tsx (Functional component)  
│ └── index.module.css (Component styles)  
├── interfaces (common typescript interfaces)  
├── hooks (Custom hooks)  
├── styles (Pages level styles)  
├── public (Static assets)  
├── mappers (data mappers)  
└──utils (Utility snippets)
