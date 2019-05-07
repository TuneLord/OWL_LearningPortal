import React from 'react';
import './checklistCounter.css';

export const ChecklistCounter = ({ number = 0 }) => {
    return (
        <div className="state checklistCounter">
            <span className="checklistNumber">{number}</span>
            <p>Liczba twoich checklist</p>
        </div>
    )
}