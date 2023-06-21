import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Skill({ skill }) {
    return <li>
        {skill.skill}
    </li>
}
