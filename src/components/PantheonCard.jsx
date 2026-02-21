import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import GlobalContext from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export default function PantheonCard({ pantheons }) {
    const quantity = pantheons.length || 1;
    const { API_STORAGE_URL } = useContext(GlobalContext);

    const [hoveredPantheonId, setHoveredPantheonId] = useState(null);
    const hoveredPantheon = pantheons.find((pantheon) => pantheon.id === hoveredPantheonId);

    return (
        <StyledWrapper>
            <div className="slider" style={{ '--width': '250px', '--height': '250px', '--quantity': quantity }}>
                <div className="list">
                    {pantheons.map((pantheon, index) => (
                        <div className="item" style={{ '--position': index + 1 }} key={pantheon.id}>
                        <Link to={`/pantheons/${pantheon.id}`} className="pantheon-slide-link">
                                <div
                                    className="pantheon-slide-card zoom-hover"
                                    style={{ backgroundImage: `url(${API_STORAGE_URL}/${pantheon.image})` }}
                                    onMouseEnter={() => setHoveredPantheonId(pantheon.id)}
                                    onMouseLeave={() => setHoveredPantheonId(null)}
                                >
                                    <p className="pantheon-slide-title">{pantheon.name}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {hoveredPantheon && (
                <div className="card p-0 mt-2 pantheon-preview" style={{ width: '30rem' }}>
                    <div className="card-header">{hoveredPantheon.name}</div>
                    <div className="card-body">
                        <div className="row">
                            {hoveredPantheon.gods?.map((god) => (
                                <div className="col-4" key={god.id}>
                                    <img
                                        src={`${API_STORAGE_URL}/${god.image}`}
                                        alt={god.name}
                                        className="img-fluid rounded-circle"
                                        style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .pantheon-slide-card {
    width: 100%;
    height: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .pantheon-slide-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }

  .pantheon-slide-title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: #fff !important;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
    margin: 0;
  }

  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
    margin-bottom: 1rem;
  }
  .slider .list {
    display: flex;
    width: 100%;
    min-width: calc(var(--width) * var(--quantity));
    position: relative;
  }
  .slider .list .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 10s linear infinite;
    transition: filter 0.5s;
    animation-delay: calc(
      (10s / var(--quantity)) * (var(--position) - 1) - 10s
    ) !important;
  }
  .slider .list .item img {
    width: 100%;
  }
  @keyframes autoRun {
    from {
      left: 100%;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }
  .slider:hover .item {
    animation-play-state: paused !important;
    filter: grayscale(1);
  }
  .slider .item:hover {
    filter: grayscale(0);
  }
  .slider[reverse="true"] .item {
    animation: reversePlay 10s linear infinite;
  }
  @keyframes reversePlay {
    from {
      left: calc(var(--width) * -1);
    }
    to {
      left: 100%;
    }
  }

  .pantheon-preview {
    margin-left: auto;
    margin-right: auto;
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: var(--bs-border-color);
    background-image: none;
  }

  .pantheon-preview .card-header,
  .pantheon-preview .card-body {
    color: inherit;
    background-color: transparent;
  }
`;

