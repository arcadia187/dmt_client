import React, { useState } from "react";

function StatusObj({ updates }) {
  const [expanded, setExpanded] = useState(false);
  console.log(updates);
  const recentUpdate = updates[0];

  return (
    <div>
      <div>
        {new Date(recentUpdate.time).toDateString()} : {recentUpdate.type}
      </div>
      {updates.length > 1 && (
        <div onClick={() => setExpanded(!expanded)}>
          {expanded ? "View less" : "View more"}
        </div>
      )}
      {expanded && (
        <ul>
          {updates.slice(1).map((update, i) => (
            <li key={i}>
              {update.time} : {update.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default StatusObj;
