import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Experience({ experience }) {

    return <div className="profile-section-details">
        <h4>{experience.experienceTitle}</h4>
        <h5>{experience.company}</h5>
        <div>{`${experience.fromDate} - ${experience.toDate}`}</div>
        <div>
            {experience.experienceDetails}
        </div>

    </div>
}
