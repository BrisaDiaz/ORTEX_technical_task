export default function Test() {
  const data = {
    state: "down" as const,
    exchange: 1.13072,
    percentage: -0.16,
    from: {
      currency: "EUR",
      name: "Euro",
    },
    to: {
      currency: "USD",
      name: "United States Dollar",
    },
    lastUpdate: "21/2/2022 19:57:03",
  };

  return (
    <main>
      <div className="trending">
        <span className="currency-names">
          {data.from.currency}/{data.to.currency}
        </span>
        <p className="exchange">
          <span className="price">{data.exchange}</span>
          <span className={`percentage ${data.state === "down" ? "trending-down" : "trending-up"}`}>
            {data.percentage} {data.state === "down" ? <TrendingDown /> : <TrendingUp />}
          </span>
        </p>
        <p className="date">{data.lastUpdate}</p>
      </div>
      <style>{`
      .trending{
width:140px;
position:relative;

    padding: 0 4px;
      }
      .currency-names{
        font-size:12px;
      }
    .exchange{
      font-weight: 600;
    display: flex;
    justify-content: space-between;
        margin: 0;
        padding:  10px 0 2px 0;
        border-bottom: 1px dashed;
    
    }
    .percentage{
          display: flex;
    gap: 3px;
    }
    .trending-up{
color:var(--primary)
    }
    .trending-down{
color:var(--secondary)
    }
.date{
      font-size: 10px;
      margin:0;
          text-align: end;
    padding: 2px 0;
}


      `}</style>
    </main>
  );
}

function TrendingUp() {
  return (
    <svg
      fill="var(--primary)"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
    </svg>
  );
}
function TrendingDown() {
  return (
    <svg
      fill="var(--secondary)"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z" />
    </svg>
  );
}
