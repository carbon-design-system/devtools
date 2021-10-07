/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
import '../styles/random.scss';
import * as icons from '@carbon/icons-react';
import * as pictograms from '@carbon/pictograms-react';
import Head from 'next/head';
import {
  Card,
  CardGroup,
  Layout,
  LinkList,
  ImageWithCaption,
  PictogramItem,
  ScrollAnimations,
  TableOfContents,
  LeadSpace,
  LeadSpaceBlock,
  ButtonGroup,
} from '@carbon/ibmdotcom-react';
import React, { useState, useEffect } from 'react';
import ContentBlock from '@carbon/ibmdotcom-react/lib/internal/components/ContentBlock/ContentBlock';
import ContentGroup from '@carbon/ibmdotcom-react/lib/internal/components/ContentGroup/ContentGroup';
import ContentItem from '@carbon/ibmdotcom-react/lib/internal/components/ContentItem/ContentItem';
import ContentSection from '@carbon/ibmdotcom-react/lib/internal/components/ContentSection/ContentSection';
import { loremIpsum } from 'lorem-ipsum';

// [ ] lead space block
// [ ] cta block
// [ ] carousel (cards only for now)
// [ ] video?
// [ ] callout quote and with media
// [ ] content group horizontal
// [ ] feature card
// [ ] additional layouts

const leadspaceIds = [
  '135',
  '172',
  '185',
  '194',
  '266',
  '302',
  '321',
  '392',
  '452',
  '551',
  '620',
  '634',
  '656',
  '661',
  '665',
  '671',
  '691',
  '768',
  '791',
  '798',
  '808',
  '851',
  '855',
  '949',
];
const pictogramKeys = Object.keys(pictograms);
const leadspaceId = leadspaceIds[randomNum(0, leadspaceIds.length - 1)];
const includeLeadspace = Boolean(randomNum(0, 1)); // include leadspace or not

const layoutTypes = ['left', 'center'];
const layoutType = layoutTypes[randomNum(0, layoutTypes.length - 1)]; // true = left, false = center

const selectors = {
  heading:
    '.bx--content-group__title, .bx--leadspace__title, [class*=bx--content-][class*=__heading], .bx--link-list__heading',
  copy: '[class*=bx--content-][class*=__copy] p, .bx--leadspace__desc',
  media: '.bx--image-with-caption__image, .bx--image-with-caption .bx--image',
  caption: '.bx--image-with-caption__caption, .bx--image__caption',
  cta: '.bx--buttongroup-item, .bx--link-with-icon__container, [class*="__cta"] .bx--card, [class*="__CTA"] .bx--card, .bx--link-list__list__CTA',
  card: '.bx--card-group__cards__col',
  contentBlock: '.bx--content-block',
  contentGroup: '.bx--content-group',
  contentItem: '.bx--content-item',
  // leadspace: '.bx--leadspace',
  cardGroup: '[data-autoid="dds--card-group"]',
  mediaWithCaption: '.bx--image-with-caption',
  pictogramItem: '.bx--pictogram-item',
  pictogram: '.bx--pictogram-item__pictogram',
};
const selectorKeys = Object.keys(selectors);

let searchParams = new URLSearchParams('');

/**
 * Animations prototype
 *
 * @returns {*} JSX for Animation template
 */
const Random = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    searchParams = new URLSearchParams(window.location.search);

    const includeIntro = Boolean(randomNum(0, 1)); // include leadspace or not
    const includeSections = Boolean(randomNum(0, 1)); // include leadspace or not
    const fullBleed = Boolean(randomNum(0, 1)); // include leadspace or not
    let content = [];

    if (fullBleed || searchParams.get('full-bleed') === 'true') {
      document.querySelector('body').classList.add('random--bleed');
    }

    if (includeLeadspace) {
      content.push(renderLeadspace(layoutType ? randomNum(0, 1) : 1)); // 0/false = left, 1/true = centered
    }

    if (includeIntro || !includeSections || !includeLeadspace) {
      content.push(randomIntroSection());
    }

    if (includeSections) {
      content.push(randomSection());
    }

    selectorKeys.forEach((selector) => {
      if (searchParams.get(selector)) {
        content = (
          <ScrollAnimations
            keepAnimations={
              searchParams.get('repeatOverride')
                ? searchParams.get('repeatOverride') !== 'false'
                : searchParams.get(selector + 'Repeat') !== 'false'
            }
            selectorTargets={
              searchParams.get(selector) === 'true' ? selectors[selector] : ''
            }
            animation={
              searchParams.get('singleType')
                ? searchParams.get('singleType')
                : searchParams.get(selector + 'Type') || 'slide-up'
            }
          >
            {content}
          </ScrollAnimations>
        );
      }
    });

    setContent(
      <div className="random">
        <Head>
          <title key="title">Carbon devtools: Random page generator</title>
        </Head>
        <style>
          {selectorKeys.map((selector) => {
            if (searchParams.get(selector)) {
              return `
                ${selectors[selector]} {
                  transition-delay: ${
                    searchParams.get(selector + 'Delay') || 0
                  }s${
                searchParams.get(selector + 'Delay') ? ' !important' : ''
              };
                }`;
            }
          })}
        </style>

        {content}
      </div>
    );
  }, []);

  return content;
};

/**
 * Generate a random intro section
 *
 * @returns {*} JSX for Random template
 */
function randomIntroSection() {
  const childrenOptions = [randomContentBlock];

  const sectionOptions = [
    <TableOfContents stickyOffset={48} key={Math.random()}>
      {!includeLeadspace && randomLeadspaceBlock()}
      {randomChildren(randomNum(3, 6), childrenOptions)}
    </TableOfContents>,
    <ContentSection heading={''} key={Math.random()}>
      {!includeLeadspace && randomLeadspaceBlock()}
      {randomChildren(randomNum(0, 3), childrenOptions)}
    </ContentSection>,
  ];

  return sectionOptions[randomNum(0, sectionOptions.length - 1)];
}

/**
 * random lead space block
 *
 * @returns {*} JSX for Random template
 */
function randomLeadspaceBlock() {
  const includeEyebrow = true;
  const includeHeading = Boolean(randomNum(0, 1));
  const includeCopy = Boolean(randomNum(0, 1));
  const includeMedia = Boolean(randomNum(0, 1));
  const includeLinkList = true;
  const includeCTA = Boolean(randomNum(0, 1));

  const data = {};

  if (includeEyebrow) {
    const length = randomNum(1, 3);
    const text = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 5,
      units: 'sentence',
    })
      .replace('.', '')
      .split(' ');

    for (let i = 0; i < length; i++) {
      if (text[i]) {
        if (!data.title) {
          data.title = text[i];
        } else {
          data.title += ' ' + text[i];
        }
      } else {
        break;
      }
    }
  }

  if (includeHeading) {
    data.heading = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 5,
      units: 'sentence',
    }).replace('.', '');
  }

  if (includeCopy) {
    data.copy = loremIpsum({
      count: randomNum(1, 3),
      units: 'sentence',
    });
  }

  if (includeMedia) {
    data.mediaType = 'image';
    data.mediaData = {
      image: {
        alt: 'Lorem picsum',
        longDescription: 'long description',
        defaultSrc: 'https://picsum.photos/1600/900?' + Math.random(),
      },
      lightbox: Boolean(randomNum(0, 1)),
      heading: loremIpsum({
        count: 1,
        units: 'sentence',
      }),
      copy: loremIpsum({
        count: randomNum(1, 2),
        units: 'paragraphs',
        suffix: '\n\n',
      }),
      showCaption: Boolean(randomNum(0, 1)),
    };
  }

  if (includeLinkList) {
    data.items = randomLinkList('vertical-end', true);
    data.heading = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 5,
      units: 'sentence',
    }).replace('.', '');
  }

  if (includeCTA) {
    data.cta = {
      style: 'button',
      buttons: renderButtonGroup(true),
    };
  }

  return (
    <Layout
      type="2-1"
      nested={true}
      border={Boolean(randomNum(0, 1))}
      key={Math.random()}
    >
      <div>
        <a name={data.title.replace(/ /g, '-')} data-title={data.title} />
        <LeadSpaceBlock {...data} key={Math.random()} />
      </div>
      <aside></aside>
    </Layout>
  );
}

/**
 * Generate a random section
 *
 * @returns {*} JSX for Random template
 */
function randomSection() {
  const sectionOptions = [randomContentSection];
  const themes = ['g10', 'g90', 'g100'];

  // contentSection, Custom (e.g. 4x4x4x4, 8x8)?

  return randomChildren(randomNum(1, 4), sectionOptions).map((item) => {
    return (
      <div
        key={Math.random()}
        className={[
          !randomNum(0, 1)
            ? ` random--${themes[randomNum(0, themes.length - 1)]}`
            : '',
          'random--themed-section',
        ].join(' ')}
      >
        {item}
      </div>
    );
  });
}

/**
 * Generate a random Content block
 *
 * @returns {*} JSX for Random template
 */
function randomContentBlock() {
  const includeHeading = true;
  const includeCopy = Boolean(randomNum(0, 4));
  const includeAside = Boolean(randomNum(0, 1));
  const includeChildren = Boolean(randomNum(0, 4));
  const includeCTA = !includeChildren;
  const includeBorder = Boolean(randomNum(0, 5));
  const children = {
    aside: [randomContentGroup],
    noAside: [randomContentGroup, randomCardGroup], // 12 column layouts not allowed
  };
  const data = {};

  data.layoutBorder = includeBorder;

  if (includeHeading) {
    data.heading = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 6,
      units: 'sentence',
    }).replace('.', '');
  }

  if (includeCopy) {
    data.copy = loremIpsum({
      count: randomNum(1, 3),
      units: 'sentence',
    });
  }

  if (includeAside) {
    data.layoutAside = randomChildren(1, [
      () =>
        randomContentItem({
          heading: {
            sentenceUpperBound: 5,
            units: 'sentence',
          },
          copy: {
            count: 2,
            units: 'sentence',
          },
          cta: {
            sentenceUpperBound: 5,
            units: 'sentence',
          },
        }),
      () => randomLinkList(['card', 'vertical'][randomNum(0, 1)]),
      randomImageWithCaption,
    ]);
  }

  if (includeChildren) {
    data.children = randomChildren(
      randomNum(1, 4),
      includeAside ? children.aside : children.noAside,
      true
    );
  }

  if (includeCTA) {
    data.cta = {
      style: 'card',
      type: ['local', 'external'][randomNum(0, 1)],
      copy: loremIpsum({
        count: 1,
        sentencLowerBound: 2,
        sentenceUpperBound: 5,
        units: 'sentence',
      }).replace('.', ''),
      cta: {
        href: randomUrl(),
      },
    };
  }

  return (
    <Layout
      type="2-1"
      nested={true}
      border={data.layoutBorder}
      key={Math.random()}
    >
      <div>
        <a name={data.heading.replace(/ /g, '-')} data-title={data.heading} />
        <ContentBlock {...data} />
      </div>
      <aside>{data.layoutAside}</aside>
    </Layout>
  );
}

/**
 * Generate a random card section
 *
 * @returns {*} JSX for Random template
 */
function randomContentSection() {
  // content item
  // content block heading?
  // card group (3 columns centered, 4 columns left)
  // accordion
  // tabs extended

  const includeHeading = true;
  const includeCopy = Boolean(randomNum(0, 1));
  const includeCTA = Boolean(randomNum(0, 1));

  const data = {};
  const children = [randomCardGroup, randomContentBlock];

  if (includeHeading) {
    data.heading = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 6,
      units: 'sentence',
    }).replace('.', '');
  }

  if (includeCopy) {
    data.copy = loremIpsum({
      count: 1,
      units: 'sentence',
    });
  }

  if (includeCTA) {
    data.cta = {
      style: 'text',
      type: 'local',
      copy: loremIpsum({
        count: 1,
        sentencLowerBound: 2,
        sentenceUpperBound: 5,
        units: 'sentence',
      }).replace('.', ''),
      cta: {
        href: randomUrl(),
      },
    };
  }

  return (
    <ContentSection {...data} key={Math.random()}>
      {randomChildren(1, children)}
    </ContentSection>
  );
}

/**
 * Generate a random Content group
 *
 * @returns {*} JSX for Random template
 */
function randomContentGroup() {
  return renderByCount(
    randomNum(1, 4),
    (data) => <ContentGroup {...data} key={Math.random()} />,
    () => {
      const includeHeading = true;
      const includeCopy = Boolean(randomNum(0, 1));
      const includeChildren = includeCopy ? Boolean(randomNum(0, 1)) : true;
      let includeCTA = !randomNum(0, 2);
      const style = includeChildren
        ? 'card'
        : ['card', 'text'][randomNum(0, 1)];

      const data = {};

      if (includeHeading) {
        data.heading = loremIpsum({
          count: 1,
          sentencLowerBound: 1,
          sentenceUpperBound: 6,
          units: 'sentence',
        }).replace('.', '');
      }

      if (includeCopy) {
        data.copy = loremIpsum({
          count: randomNum(1, 5),
          units: 'sentence',
        });
      }

      if (includeChildren) {
        data.children = randomChildren(
          randomNum(1, 4),
          [randomContentItem, randomCardGroup, randomPictogramItem],
          true
        );

        if (
          data.children[0] &&
          data.children[0].props &&
          (data.children[0].props.cards || data.children[0].props.pictogram)
        ) {
          includeCTA = false;
        }
      }

      if (includeCTA) {
        data.cta = {
          style: style,
          type: 'local',
          copy: loremIpsum({
            count: 1,
            sentencLowerBound: 2,
            sentenceUpperBound: 5,
            units: 'sentence',
          }).replace('.', ''),
          cta: {
            href: randomUrl(),
          },
        };
      }

      return data;
    }
  );
}

/**
 * Generate a random Content item
 *
 * @param {object} options settings for content item content
 *
 * @returns {*} JSX for Random template
 */
function randomContentItem(options) {
  const includeHeading = options.includeHeading || Boolean(randomNum(0, 3));
  const includeCopy = options.includeCopy || Boolean(randomNum(0, 3));
  const includeMedia =
    options.includeMedia || !(includeHeading && includeCopy)
      ? true
      : !randomNum(0, 4);
  const includeCTA = Boolean(randomNum(0, 2));
  const data = {};

  if (includeHeading) {
    data.heading = loremIpsum({
      count: 1,
      units: 'sentence',
      ...options.heading,
    }).replace('.', '');
  }

  if (includeCopy) {
    data.copy = loremIpsum({
      count: 3,
      units: 'paragraphs',
      suffix: '\n\n',
      ...options.copy,
    });
  }

  if (includeMedia) {
    data.mediaType = 'image';
    data.mediaData = {
      image: {
        alt: 'Lorem picsum',
        longDescription: 'long description',
        defaultSrc: 'https://picsum.photos/1600/900?' + Math.random(),
      },
      lightbox: Boolean(randomNum(0, 1)),
      heading: loremIpsum({
        count: 1,
        units: 'sentence',
      }),
      copy: loremIpsum({
        count: randomNum(1, 2),
        units: 'paragraphs',
        suffix: '\n\n',
      }),
      showCaption: Boolean(randomNum(0, 1)),
    };
  }

  if (includeCTA) {
    data.cta = {
      style: 'text',
      type: ['local', 'external', 'download', 'jump'][randomNum(0, 3)],
      copy: loremIpsum({
        count: 1,
        sentencLowerBound: 2,
        sentenceUpperBound: 5,
        units: 'sentence',
      }).replace('.', ''),
      href: randomUrl(),
    };
  }

  return <ContentItem {...data} key={Math.random()} />;
}

/**
 * Generate a random image with caption
 *
 * @returns {*} JSX for Random template
 */
function randomImageWithCaption() {
  const data = {
    image: {
      alt: 'Lorem picsum',
      longDescription: 'long description',
      defaultSrc: 'https://picsum.photos/1600/900?' + Math.random(),
    },
    lightbox: Boolean(randomNum(0, 1)),
    heading: loremIpsum({
      count: 1,
      units: 'sentence',
    }),
    copy: loremIpsum({
      count: randomNum(1, 2),
      units: 'paragraphs',
      suffix: '\n\n',
    }),
    showCaption: Boolean(randomNum(0, 1)),
  };

  return <ImageWithCaption {...data} key={Math.random()} />;
}

/**
 * Generate a random Pictogram item
 *
 * @returns {*} JSX for Random template
 */
function randomPictogramItem() {
  const includeHeading = true;
  const includeCopy = true;
  const includeMedia = true;
  const includeCTA = Boolean(randomNum(0, 2));
  const data = {};

  if (includeHeading) {
    data.heading = loremIpsum({
      count: 1,
      sentencLowerBound: 3,
      sentenceUpperBound: 10,
      units: 'sentence',
    }).replace('.', '');
  }

  if (includeCopy) {
    data.copy = loremIpsum({
      count: 1,
      paragraphLowerBound: 2,
      paragraphUpperBound: 4,
      units: 'paragraphs',
      suffix: '\n\n',
    });
  }
  if (includeMedia) {
    const chosenKey = pictogramKeys[randomNum(0, pictogramKeys.length - 1)];

    data.pictogram = {
      src: pictograms[chosenKey],
      'aria-label': chosenKey,
    };
  }

  if (includeCTA) {
    data.cta = {
      type: ['local', 'external', 'download', 'jump'][randomNum(0, 3)],
      copy: loremIpsum({
        count: 1,
        sentencLowerBound: 2,
        sentenceUpperBound: 5,
        units: 'sentence',
      }).replace('.', ''),
      href: randomUrl(),
    };
  }

  return <PictogramItem {...data} key={Math.random()} />;
}

/**
 * Generate a random Card group
 *
 * @param {number} alreadyRun -1 if not already included in group
 *
 * @returns {*} JSX for Random template
 */
function randomCardGroup(alreadyRun = -1) {
  if (alreadyRun > -1) {
    return '';
  }

  const numOfCards = randomNum(2, 5);
  const includeCTA = !randomNum(0, 2);
  const data = {};

  const cardToInclude = {
    media: !randomNum(0, 2),
    eyebrow: Boolean(randomNum(0, 1)),
    heading: true,
    copy: Boolean(randomNum(0, 1)),
    cta: Boolean(randomNum(0, 1)),
  };

  const cards = [];

  for (let i = 0; i < numOfCards; i++) {
    cards.push(randomCard(true, cardToInclude));
  }

  if (!cardToInclude.media && includeCTA) {
    data.cta = randomCard(true, cardToInclude);
  }

  return <CardGroup cards={cards} key={Math.random()} {...data} />;
}

/**
 * Generate a random Card
 *
 * @param {number} dataOnly return only data if true, include component if false
 * @param {number} include object of what properties to include
 *
 * @returns {*} JSX for Random template
 */
function randomCard(dataOnly, include = {}) {
  const includeMedia = Object.prototype.hasOwnProperty.call(include, 'media')
    ? include.media
    : Boolean(randomNum(0, 1));
  const includeEyebrow = Object.prototype.hasOwnProperty.call(
    include,
    'eyebrow'
  )
    ? include.eyebrow
    : Boolean(randomNum(0, 1));
  const includeCopy = Object.prototype.hasOwnProperty.call(include, 'copy')
    ? include.copy
    : Boolean(randomNum(0, 1));
  const includeHeading = Object.prototype.hasOwnProperty.call(
    include,
    'heading'
  )
    ? include.heading
    : Boolean(randomNum(0, 1));

  const data = {};

  if (includeEyebrow) {
    data.eyebrow = loremIpsum({
      count: 1,
      units: 'sentence',
    }).split(' ')[0];
  }

  if (includeHeading) {
    data.heading = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 6,
      units: 'sentence',
    }).replace('.', '');
  }

  if (includeCopy) {
    data.copy = loremIpsum({
      count: 2,
      units: 'sentence',
    });
  }

  if (includeMedia) {
    data.image = {
      alt: 'Lorem picsum',
      longDescription: 'long description',
      defaultSrc: 'https://picsum.photos/1600/900?' + Math.random(),
    };
  }

  data.cta = {
    style: 'text',
    type: ['local', 'external', 'downlaod'][randomNum(0, 2)],
    copy: loremIpsum({
      count: 1,
      sentencLowerBound: 2,
      sentenceUpperBound: 5,
      units: 'sentence',
    }).replace('.', ''),
    href: randomUrl(),
  };

  if (dataOnly) {
    return data;
  }

  return <Card {...data} key={Math.random()} />;
}

/**
 * Generate a random children
 *
 * @param {number} count number of children to return
 * @param {object} compList array of components to choose from
 * @param {boolean} singleType picks a random child for each loop if false, if true picks one child for all loops
 *
 * @returns {*} JSX for Random template
 */
function randomChildren(count, compList, singleType = false) {
  const children = [];
  const runOnce = [];

  let randomIndex = randomNum(0, compList.length - 1);
  const chosenComp = compList[randomIndex];

  for (let i = 0; i < count; i++) {
    if (singleType) {
      children.push(chosenComp(runOnce.indexOf(randomIndex)));
    } else {
      randomIndex = randomNum(0, compList.length - 1);
      children.push(compList[randomIndex](runOnce.indexOf(randomIndex)));
    }

    if (runOnce.indexOf(randomIndex) < 0) {
      runOnce.push(randomIndex);
    }
  }

  return children;
}

/**
 * Generate leadspace
 *
 * @param {string} typeIndex override random type based on parent information
 *
 * @returns {*} JSX for Random template
 */
function renderLeadspace(typeIndex) {
  const includeMedia = Boolean(randomNum(0, 1));
  const includeCopy = Boolean(randomNum(0, 1));
  const includeHeading = true;
  const includeCTA = Boolean(randomNum(0, 2));

  const data = {
    gradient: true,
    size: ['tall', 'medium', 'super'][randomNum(0, 2)],
    type: ['left', 'centered'][typeIndex || randomNum(0, 1)],
  };

  if (includeHeading || !includeCopy) {
    data.title = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 6,
      units: 'sentence',
    }).replace('.', '');
  }

  if (includeCopy) {
    data.copy = loremIpsum({
      count: 1,
      sentencLowerBound: 10,
      sentenceUpperBound: 20,
      units: 'sentence',
    });
  }

  if (includeCTA) {
    data.buttons = renderButtonGroup(true);
  }

  if (includeMedia) {
    data.image = {
      defaultSrc: `https://picsum.photos/id/${leadspaceId}/1056/480`,
      alt: 'Lead space image',
    };
  } else {
    data.theme = ['g10', 'g90', 'g100'][randomNum(0, 2)];
  }

  return <LeadSpace {...data} key={Math.random()} />;
}

/**
 * Random button
 *
 * @param {string} dataOnly data or component
 *
 * @returns {*} JSX for Random template
 */
function renderButtonGroup(dataOnly) {
  const numOfBtns = randomNum(1, 2);
  const includeMedia = Boolean(randomNum(0, 1));

  const data = [];

  for (let i = 0; i < numOfBtns; i++) {
    data.push({
      copy: loremIpsum({
        count: 1,
        sentencLowerBound: 2,
        sentenceUpperBound: 5,
        units: 'sentence',
      }).replace('.', ''),
      renderIcon: includeMedia ? icons['ArrowRight20'] : null,
      href: randomUrl(),
    });
  }

  if (dataOnly) {
    return data;
  }

  return <ButtonGroup {...data} key={Math.random()} />;
}

/**
 * Random link list
 *
 * @param {string} style style type of component
 * @param {string} dataOnly data or component
 *
 * @returns {*} JSX for Random template
 */
function randomLinkList(style, dataOnly) {
  const includeHeading = Boolean(randomNum(0, 1));
  const numOfLinks = randomNum(1, 4);

  const data = {
    style: style,
    items: [],
  };

  if (includeHeading) {
    data.heading = loremIpsum({
      count: 1,
      sentencLowerBound: 1,
      sentenceUpperBound: 5,
      units: 'sentence',
    }).replace('.', '');
  }

  for (let i = 0; i < numOfLinks; i++) {
    data.items.push({
      copy: loremIpsum({
        count: 1,
        sentencLowerBound: 2,
        sentenceUpperBound: 5,
        units: 'sentence',
      }).replace('.', ''),
      type: ['external', 'local'][randomNum(0, 1)],
      href: randomUrl(),
      cta: {
        href: randomUrl(),
      },
    });
  }

  if (dataOnly) {
    return data;
  }

  return <LinkList {...data} key={Math.random()} />;
}

/**
 * Render by count
 *
 * @param {number} count Number of times to render
 * @param {*} Component Template to render multiple times
 * @param {object} data Data to be passed through to component
 *
 * @returns {*} JSX for Random template
 */
function renderByCount(count, Component, data) {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push(Component(data()));
  }

  return items;
}

/**
 * Randum number
 *
 * @param {*} min minimum number
 * @param {*} max maximum number
 *
 * @returns {number} integer
 */
function randomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Random url
 *
 * @returns {string} url
 */
function randomUrl() {
  const newURL = new URLSearchParams('');
  const oldURL = new URLSearchParams(window.location.search);
  const types = [
    'fade',
    'slide-up',
    'slide-up-right',
    'slide-right',
    'slide-down-right',
    'slide-down',
    'slide-down-left',
    'slide-left',
    'slide-up-left',
  ];
  const groupedContentTypes = [
    'contentBlock',
    'contentGroup',
    'contentItem',
    'cardGroup',
    'mediaWithCaption',
    'pictogramItem',
  ];
  const individualContentTypes = [
    'heading',
    'copy',
    'cta',
    'card',
    'media',
    'caption',
    'pictogram',
  ];
  const preferredContentTypes = [
    'heading',
    'copy',
    'cta',
    'card',
    'mediaWithCaption',
    'pictogram',
  ];

  let contentTypes = [];
  let singleType = types[randomNum(0, types.length - 1)];

  if (types.indexOf(oldURL.get('singleType')) > -1) {
    singleType = types[types.indexOf(oldURL.get('singleType'))];
  }

  if (oldURL.get('fixed') === 'false') {
    if (oldURL.has('fixed')) {
      newURL.append('fixed', oldURL.get('fixed'));
    }

    if (oldURL.has('repeatOverride')) {
      newURL.append('repeatOverride', oldURL.get('repeatOverride'));
    }

    if (oldURL.has('singleType')) {
      if (oldURL.has('singleType') === 'random') {
        newURL.append('singleType', 'random');
      } else {
        newURL.append('singleType', singleType);
      }
    }

    if (oldURL.has('contentType')) {
      newURL.append('contentType', oldURL.get('contentType'));

      if (oldURL.get('contentType') === 'grouped') {
        contentTypes = contentTypes.concat(groupedContentTypes);
      } else if (oldURL.get('contentType') === 'individual') {
        contentTypes = contentTypes.concat(individualContentTypes);
      } else if (oldURL.get('contentType') === 'all') {
        contentTypes = contentTypes.concat(individualContentTypes);
        contentTypes = contentTypes.concat(groupedContentTypes);
      } else {
        contentTypes = contentTypes.concat(preferredContentTypes);
      }
    } else {
      contentTypes = contentTypes.concat(preferredContentTypes);
    }

    contentTypes.forEach((value) => {
      if (randomNum(0, 1)) {
        newURL.append(value, 'true');
        newURL.append(
          value + 'Type',
          oldURL.has('singleType')
            ? singleType
            : types[randomNum(0, types.length - 1)]
        );

        if (randomNum(0, 1)) {
          newURL.append(value + 'Repeat', String(Boolean(randomNum(0, 1))));
        }
      }
    });

    if (oldURL.has('ctaDelay')) {
      newURL.append('ctaDelay', oldURL.get('ctaDelay'));
    }

    return location.origin + location.pathname + '?' + newURL.toString();
  } else {
    return window.location.href;
  }
}

export default Random;
