import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import GlobalContext from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export default function PantheonCard({ gods }) {
    const quantity = gods.length || 1;
    const { API_STORAGE_URL } = useContext(GlobalContext);

    return (
        <StyledWrapper>
            <div className="slider" style={{ '--width': '250px', '--height': '250px', '--quantity': quantity }}>
                <div className="list">
                    {gods.map((god, index) => (
                        <div className="item" style={{ '--position': index + 1 }} key={god.id}>
                        <Link to={`/gods/${god.id}`} className="god-slide-link">
                                <div
                                    className="god-slide-card zoom-hover"
                                    style={{ backgroundImage: `url(${API_STORAGE_URL}/${god.image})` }}
                                >
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .god-slide-card {
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
`;

