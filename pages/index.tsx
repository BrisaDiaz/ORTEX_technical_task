import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import ResetPasswordModal from "@/components/ResetPasswordModal";
import styles from "../styles/Home.module.css";
import FloatingCurrencyRate from "@/components/FloatingCurrencyRate";
import LoginForm from "@/components/LoginForm";
import LoadingModal from "@/components/LoadingModal";
import PopNotification from "@/components/Dialog";
import { formatCurrencyRate } from "@/utils/formatCurrencyRate";
import { env } from "env";
const Home: NextPage = () => {
  const [pageState, setPageState] = React.useState<{
    isLoading: boolean;
    notification: { title: string; message: string };
  }>({
    isLoading: false,
    notification: { title: "", message: "" },
  });

  const [EURUSDMarketPrice, setEURUSDMarketPrice] = React.useState<any>(null);
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
    setModalState({ isOpen: false });
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

  const handleResetPassword = async (formData: { [key: string]: string }) => {
    handleCloseModal();
    setPageState({
      ...pageState,
      isLoading: true,
    });
    const response = await fetch("/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
  };

  const handleLogin = async (formData: { [key: string]: string }) => {
    if (!formData) return;
    setPageState({
      ...pageState,
      isLoading: true,
    });
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
  };

  React.useEffect(() => {
    const socketConnection = new WebSocket(env.WEBSOCKET_URL);

    socketConnection.onopen = (event: any) => {
      if (event.currentTarget.readyState == 1) {
        socketConnection.send(
          JSON.stringify({ topic: "subscribe", to: "EURUSD:CUR" })
        );
      }
    };
    socketConnection.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.topic === "EURUSD") {
        const formattedData = formatCurrencyRate(data);
        //// in case  the information about the latest price is not retrieved from for the websocket feed
        //// the formattedData will be null and a loading indicator will be shown until the next sucessfull response
        setEURUSDMarketPrice(formattedData);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | ORTEX.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.currencySection}>
          <FloatingCurrencyRate data={EURUSDMarketPrice} />
        </section>
        <section className={styles.formSection}>
          <LoginForm
            onForgotPassword={handleOpenModal}
            onSubmit={handleLogin}
          />
        </section>
        <ResetPasswordModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSubmit={handleResetPassword}
        />
        <LoadingModal isLoading={pageState.isLoading} />
        <PopNotification
          isOpen={Boolean(pageState.notification.title)}
          title={pageState.notification.title}
          message={pageState.notification.message}
          onClose={autoClearNotification}
        />
      </main>
    </div>
  );
};

export default Home;
