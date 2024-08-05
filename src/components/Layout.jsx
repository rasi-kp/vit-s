// Layout.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Layout = ({ children, pageTitle }) => {
    return (
        <>
            <Helmet>
                {/* Common metadata for all pages */}
                <title>{pageTitle || "Savvypool"}</title>
                <meta name="description" content="Easily find and join the best short courses and Institutes from our carefully chosen list. Learning made simple, just for you!" />
                <meta name="keywords"
                    content="SavvyPool,www.SavvyPool.com,Savvypool.com,short course directory,short course,savvypool,Savvy,Savvy,savvypool,learning platform,open online course, training,courses,crash courses,education platform, python courses,digital marketing, certified courses,degree courses, professional, learn, university, education platform, savvypool full-stack web development" />
                <meta name="author" content="SavvyPool" />
                <meta name="robots" content="index,follow" />
                <meta name="revisit-after" content="7 days" />
                {/* ... other common metadata */}

                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.savvypool.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "List Your Institute",
                  "item": "https://www.savvypool.com/institute"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Search Courses",
                    "item": "https://www.savvypool.com/search"
                }
              ]
            }
          `}
                </script>
            </Helmet>

            {children}
        </>
    );
};

export default Layout;