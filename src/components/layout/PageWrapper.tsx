import Head from 'next/head';
import * as React from 'react';
import Wrapper from './Wrapper';

interface PageWrapperProps {
    title?: string;
    pageTitle?: string;
    author?: string;
    description?: string;
    children?: React.ReactNode;
}

const defaultDescription = 'Kemeja Berkualitas'
const defaultKeywords = 'kemeja, bandung, grosir'
const defaultTitle = 'Messaging App';
const defaultAuthor = 'ozhilmi'


const PageWrapper: React.FC<PageWrapperProps> = ({ pageTitle, children, description = defaultDescription, title = defaultTitle, author = defaultAuthor
}) => {
    const noHTMLTagDescription = description.replace(/<\/?[^>]+(>|$)/g, ``);
    const metaAttributes = [
        {
            name: `description`,
            content: noHTMLTagDescription,
        },
        {
            name: 'keywords',
            content: defaultKeywords,
        },
        {
            property: `og:title`,
            content: title,
        },
        {
            property: `og:description`,
            content: noHTMLTagDescription,
        },
        {
            property: `og:image`,
            content: `https://kawalcovid19.id/android-chrome-192x192.png`,
        },
        {
            property: `og:image:width`,
            content: `192`,
        },
        {
            property: `og:image:height`,
            content: `192`,
        },
        {
            property: `og:type`,
            content: `website`,
        },
        {
            name: `twitter:card`,
            content: `summary`,
        },
        {
            name: `twitter:creator`,
            content: author,
        },
        {
            name: `twitter:title`,
            content: title,
        },
        {
            name: `twitter:description`,
            content: noHTMLTagDescription,
        },
    ];


    return (
        <>
            <Head>
                <title>{title}</title>
                {metaAttributes.map(attributes => (
                    <meta key={attributes.name || attributes.property} {...attributes} />
                ))}
            </Head>
            <Wrapper title={title}>
                <div className='flex justify-between'>
                    {children}
                </div>
            </Wrapper>

        </>
    )
}

export default PageWrapper