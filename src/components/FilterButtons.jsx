import React from 'react';

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="mb-3 d-flex gap-2">
      <button
        className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`btn btn-sm ${filter === 'incomplete' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('incomplete')}
      >
        Incomplete
      </button>
      <button
        className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterButtons;