import React from "react";

function Slug({ params }) {
  return (
    <main>
      <h1>{params.slug}</h1>
    </main>
  );
}

export default Slug;
