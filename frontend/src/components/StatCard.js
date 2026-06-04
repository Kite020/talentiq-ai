function StatCard({

  title,

  value,

  icon

}) {

  return (

    <div
      className="card shadow border-0 h-100 stat-card"
    >

      <div className="card-body">

        <div
          className="d-flex justify-content-between align-items-center"
        >

          <div>

            <h6
              className="text-muted"
            >
              {title}
            </h6>

            <h2
              className="fw-bold"
            >
              {value}
            </h2>

          </div>

          <div
            style={{
              fontSize: "2rem"
            }}
          >

            {icon}

          </div>

        </div>

      </div>

    </div>

  );
}

export default StatCard;