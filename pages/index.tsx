import type {NextPage} from "next";

import React from "react";
import Head from "next/head";

import ResetPasswordModal from "@/components/ResetPasswordModal";
import FloatingCurrencyRate from "@/components/FloatingCurrencyRate";
import LoginForm from "@/components/LoginForm";
import LoadingModal from "@/components/LoadingModal";
import PopNotification from "@/components/Notification";
import {CurrencyExchangeInfo, CurrencyExchangeSubscriptionMessage} from "interfaces";
import mapCurrencyExchange from "@/mappers/mapCurrencyExchange";
import {env} from "env";

import styles from "../styles/Home.module.css";
const Home: NextPage = () => {
  const [pageState, setPageState] = React.useState<{
    isLoading: boolean;
    notification: {title: string; message: string};
  }>({
    isLoading: false,
    notification: {title: "", message: ""},
  });

  const [EURUSDMarketPrice, setEURUSDMarketPrice] = React.useState<null | CurrencyExchangeInfo>(
    null,
  );
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });

  const handleOpenModal = () => {
    setModalState({
      isOpen: true,
    });
  };
  const handleCloseModal = () => {
    setModalState({isOpen: false});
  };
  const autoClearNotification = (timeout?: number) => {
    return setTimeout(() => {
      setPageState({
        notification: {
          title: "",
          message: ``,
        },
        isLoading: false,
      });
    }, timeout || 0);
  };

  const handleResetPassword = async (formData: {
    [emailAddress: string]: string | FileList | string[];
  }) => {
    handleCloseModal();
    setPageState({
      ...pageState,
      isLoading: true,
    });
    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: formData.emailAddress}),
      });

      const data = await response.json();

      Boolean(data.email)
        ? setPageState({
            notification: {
              title: "An email has been sent to you",
              message:
                "Please check your inbox for the instructions to keep in order to reset your password. If there is't set your email address again to send you a new email.",
            },
            isLoading: false,
          })
        : setPageState({
            notification: {
              title: "Email could't be send",
              message: data.message,
            },
            isLoading: false,
          });

      return autoClearNotification(7000);
    } catch (error) {
      setPageState({
        notification: {
          title: "Email could't be send",
          message:
            "Sorry, something went wrong. An error has occurred on the server.Please retry again.",
        },
        isLoading: false,
      });

      return autoClearNotification(4000);
    }
  };

  const handleLogin = async (formData: {[key: string]: string | FileList | string[]}) => {
    if (!formData) return;
    setPageState({
      ...pageState,
      isLoading: true,
    });
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      Boolean(data.user)
        ? setPageState({
            notification: {
              title: "Welcome back!!",
              message: `User credentials: ${data.user.email}`,
            },
            isLoading: false,
          })
        : setPageState({
            notification: {
              title: "Login couldn't be completed",
              message: data.message,
            },
            isLoading: false,
          });

      return autoClearNotification(4000);
    } catch (error) {
      setPageState({
        notification: {
          title: "Login couldn't be completed",
          message:
            "Sorry, something went wrong. An error has occurred on the server.Please retry again.",
        },
        isLoading: false,
      });

      autoClearNotification(4000);

      return error;
    }
  };

  React.useEffect(() => {
    const connectSocket = async () => {
      try {
        const socketConnection = new WebSocket(env.WEBSOCKET_URL);

        socketConnection.onopen = (event: any) => {
          if (event?.currentTarget?.readyState == 1) {
            socketConnection.send(JSON.stringify({topic: "subscribe", to: "EURUSD:CUR"}));
          }
        };
        socketConnection.onmessage = (message) => {
          const data = JSON.parse(message.data);

          if (data.topic === "EURUSD") {
            const formattedData = mapCurrencyExchange(data as CurrencyExchangeSubscriptionMessage);
            //// in case  the information about the latest price is not retrieved from for the websocket feed all data will be displayed

            formattedData && setEURUSDMarketPrice(formattedData as CurrencyExchangeInfo);
          }
        };
      } catch (error) {}
    };

    connectSocket();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | ORTEX.com</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <section className={styles.currencySection}>
          <FloatingCurrencyRate data={EURUSDMarketPrice} />
        </section>
        <section className={styles.formSection}>
          <LoginForm onForgotPassword={handleOpenModal} onSubmit={handleLogin} />
        </section>
        <ResetPasswordModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSubmit={handleResetPassword}
        />
        <LoadingModal isLoading={pageState.isLoading} />
        <PopNotification
          isOpen={Boolean(pageState.notification.title)}
          message={pageState.notification.message}
          title={pageState.notification.title}
          onClose={autoClearNotification}
        />
      </main>
    </div>
  );
};

export default Home;
