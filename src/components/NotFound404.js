import { connect } from "react-redux";

const Error404 = () => {
  return (
    <section className="py-14 2xl:pt-14 2xl:pb-32 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="relative text-center py-12 md:py-24 px-4 2xl:pt-36 2xl:pb-60 bg-white rounded-7xl z-20">
          <div className="relative z-40">
            <h2 className="mb-6 font-medium font-heading text-9xl md:text-10xl xl:text-smxl leading-tight">
              404
            </h2>
            <p className="max-w-md mb-20 xl:mb-24 mx-auto font-heading font-medium text-3xl leading-10">
              Whoops. We can&rsquo;t find that page or something has gone wrong.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Error404);
