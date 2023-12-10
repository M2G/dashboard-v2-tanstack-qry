import { memo } from 'react';
import Card from 'ui/components/layouts/Card/Card';

type ConcertListProps = {
  city: string;
  display_name: string;
  uri: string;
};

function ConcertList({
  city,
  display_name: displayName,
  uri,
}: ConcertListProps) {
  //@TODO: add icon svg and use component
  return (
    <div className="o-col--one-quarter--large o-col--half--medium">
      <div className="o-cell--one">
        <Card className="mb-5 border-[hsla(0deg,0%,100%,0.1)]">
          {displayName && (
            <a href="#test">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {displayName}
              </h5>
            </a>
          )}
          {city && (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {city}
            </p>
          )}
          {uri && (
            <a
              className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              href={uri}>
              Read more
              <svg
                aria-hidden="true"
                className="ml-2 h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 14 10"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </a>
          )}
        </Card>
      </div>
    </div>
  );
}

export default memo(ConcertList);
