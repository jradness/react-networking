import React from 'react';
import './Card.css';

const Card = ({ data }) => (
      <div className={`card ${data.type}`}>
        <div className="header">
          <h2 className="card-name">{data.name}</h2>
          <div>{data.hp} HP</div>
        </div>
        <div className="img-wrapper">
          <img style={{width: "200px", textAlign: "center"}} src={data.img} alt="pokemon"/>
        </div>
        <div className="card-body">

          <h3 className="card-type">{data.type}</h3>
          <div className="card-stats">
            <div><span>Attack:</span> {data.attack}</div>
            <div><span>Damage:</span> {data.damage}</div>
            <div><span>Desc:</span> {data.desc}</div>
          </div>
          <div className="card-footer">
            <h4 className="ability">
              <div className="label">Ability</div>
              {data.ability || "None"}
            </h4>
            <h4 className="ability">
              <div className="label">Hidden Ability</div>
              {data.hidden_ability || "None"}
            </h4>
          </div>
        </div>
      </div>
);

export default Card;
