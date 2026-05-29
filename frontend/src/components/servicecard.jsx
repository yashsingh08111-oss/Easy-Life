import React from 'react';

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-card-body">
        <h3>{service.title || service.name}</h3>
        <p>{service.description || 'Reliable home service with expert support.'}</p>
        <div className="service-card-footer">
          <span className="service-price">₹{service.price?.toFixed?.(2) ?? '0.00'}</span>
          <button type="button" className="btn secondary">Book Now</button>
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;
