const Stats = () => {
  return <section className="py-16 px-4 bg-civic-accent text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">250+</div>
            <div className="text-blue-100">Issues Reported</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-blue-100">Issues Resolved</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">74%</div>
            <div className="text-blue-100">Resolution Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">7 days</div>
            <div className="text-blue-100">Avg. Resolution Time</div>
          </div>
        </div>
      </div>
    </section>;
};
export default Stats;