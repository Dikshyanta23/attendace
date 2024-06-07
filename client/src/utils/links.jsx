import React from "react";

import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  {
    text: "add student",
    path: "add-student",
    icon: <FaWpforms />,
  },
  {
    text: "all students",
    path: ".",
    icon: <MdQueryStats />,
  },
  {
    text: "all absentees",
    path: "all-absentees",
    icon: <ImProfile />,
  },
  {
    text: "combo payment",
    path: "combo-payment",
    icon: <ImProfile />,
  },
  {
    text: "all payments",
    path: "all-payments",
    icon: <MdAdminPanelSettings />,
  },
  {
    text: "attendance",
    path: "attendance",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
