import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/servicecard';
import { servicesAPI } from '../services/api';

function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setServices(response.data.services || []);
      } catch (err) {
        setError('Unable to load services right now.');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <div className="page-home">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Easy Life Services</span>
          <h1>Find trusted home service professionals fast.</h1>
          <p>Book repairs, cleaning, plumbing, and more with one click. Reliable providers and secure booking make home service easy.</p>
        </div>
      </section>

      <section className="services-section">
        <div className="section-header">
          <h2>Popular Services</h2>
          <p>Choose a service, book quickly, and get the work done at your home.</p>
        </div>

        {loading ? (
          <p className="status-message">Loading services...</p>
        ) : error ? (
          <p className="status-message error">{error}</p>
        ) : services.length === 0 ? (
          <p className="status-message">No services available yet.</p>
        ) : (
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
