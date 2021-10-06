import '../styles/global.scss';

if (!global.location) {
  global.location = { href: '' };
}

import altlangs from './data/altlang.json';
import App from 'next/app';
import DDO from './data/DDO.json';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import Head from 'next/head';
import packageJson from '../package.json';
import React from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

/**
 * Sets the root path of the alternative urls
 * Learn more about configuring alternative languages at:
 * https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/docs/building-for-ibm-dotcom.md
 *
 * @type {string|string}
 * @private
 */
const _rootPath = process.env.ALTLANG_ROOT_PATH || '/';

/**
 * Class CarbonForIBMDotcom
 */
export default class CarbonForIBMDotcom extends App {
  constructor(props) {
    super(props);
    this.state = { theme: '' };
    this.updateFavicon = this.updateFavicon.bind(this);
  }

  componentDidMount() {
    if (window.matchMedia) {
      const localUpdateFavicon = this.updateFavicon;

      localUpdateFavicon();
      window.addEventListener('load', localUpdateFavicon);

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', localUpdateFavicon);
    }
  }

  updateFavicon() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({
        theme: 'dark',
      });
    } else {
      this.setState({
        theme: 'light',
      });
    }
  }

  /**
   * Renders the DotcomShell
   *
   * @returns {*} Page wrapper JSX
   */
  render() {
    const { Component, pageProps } = this.props;
    const reactVersion = packageJson.dependencies['@carbon/ibmdotcom-react'];
    const stylesVersion = packageJson.dependencies['@carbon/ibmdotcom-styles'];
    const digitalData = `digitalData=${JSON.stringify(DDO)};`;

    const items = altlangs.map((alt, i) => (
      <link
        key={i}
        rel="alternate"
        hrefLang={`${alt.lc}-${alt.cc}`}
        href={`${_rootPath}?cc=${alt.cc}&lc=${alt.lc}`}
      />
    ));

    return (
      <>
        <Head>
          <title key="title">Carbon devtools playground</title>

          <link
            rel="icon"
            href={`${publicRuntimeConfig._assetPrefix}favicon${
              this.state.theme ? '-' + this.state.theme : ''
            }.png`}
          />

          <meta name="ibmdotcom.version.react" content={reactVersion} />
          <meta name="ibmdotcom.version.styles" content={stylesVersion} />
          <meta
            name="ibmdotcom.build.time"
            content={new Date().toISOString()}
          />
          <meta name="dcterms.date" content="2015-10-01" />
          <meta name="dcterms.rights" content="© Copyright IBM Corp. 2020" />
          <meta name="geo.country" content="US" />
          <meta name="robots" content="index,follow" />

          <script dangerouslySetInnerHTML={{ __html: digitalData }} />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            var params = new URLSearchParams(window.location.search);
            
            if(params.has('lc') && params.has('cc')) {
              var lang = params.get('lc') + '-' + params.get('cc').toUpperCase();
              document.getElementsByTagName("html")[0].setAttribute("lang", lang);
              digitalData.page.pageInfo.language = lang;
              digitalData.page.pageInfo.ibm.country = params.get('cc').toUpperCase();
            }
           `,
            }}
          />

          {items}

          {process.env.ENABLE_RTL === 'true' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
            document.documentElement.dir = 'rtl';
            document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
            `,
              }}
            />
          )}

          <script src="//1.www.s81c.com/common/stats/ibm-common.js" defer />
        </Head>
        <DotcomShell
          mastheadProps={{
            navigation: [
              {
                title: 'Random page',
                titleEnglish: 'Random page',
                url: publicRuntimeConfig._assetPrefix,
                hasMenu: false,
                hasMegapanel: false,
                menuSections: [],
              },
            ],
            selectedMenuItem: 'Random page',
            platform: {
              name: 'Carbon devtools',
              url: 'https://ibm.biz/carbon-devtools',
            },
            hasProfile: false,
            hasSearch: false,
          }}
        >
          <Component {...pageProps} />
        </DotcomShell>
      </>
    );
  }
}
