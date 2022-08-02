"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[6103],{6165:function(e,t,a){a.d(t,{Z:function(){return b}});var r=a(3366),n=a(7294),l=a(6010),i=a(7111),m=a(6742),o="sidebar_q+wC",s="sidebarItemTitle_9G5K",c="sidebarItemList_6T4b",g="sidebarItem_cjdF",d="sidebarItemLink_zyXk",u="sidebarItemLinkActive_wcJs",p=a(4973);function v(e){var t=e.sidebar;return 0===t.items.length?null:n.createElement("nav",{className:(0,l.Z)(o,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,l.Z)(s,"margin-bottom--md")},t.title),n.createElement("ul",{className:c},t.items.map((function(e){return n.createElement("li",{key:e.permalink,className:g},n.createElement(m.Z,{isNavLink:!0,to:e.permalink,className:d,activeClassName:u},e.title))}))))}var h=a(571),E=["sidebar","toc","children"];var b=function(e){var t=e.sidebar,a=e.toc,m=e.children,o=(0,r.Z)(e,E),s=t&&t.items.length>0;return n.createElement(i.Z,o,n.createElement("div",{className:"container margin-vert--lg"},n.createElement("div",{className:"row"},s&&n.createElement("aside",{className:"col col--3"},n.createElement(v,{sidebar:t})),n.createElement("main",{className:(0,l.Z)("col",{"col--7":s,"col--9 col--offset-1":!s}),itemScope:!0,itemType:"http://schema.org/Blog"},m),a&&n.createElement("div",{className:"col col--2"},n.createElement(h.Z,{toc:a})))))}},7937:function(e,t,a){a.d(t,{Z:function(){return y}});var r=a(7294),n=a(6010),l=a(3905),i=a(4973),m=a(6742),o=a(4996),s=a(941),c=a(90),g=a(7462),d=a(3366),u="iconEdit_mS5F",p=["className"],v=function(e){var t=e.className,a=(0,d.Z)(e,p);return r.createElement("svg",(0,g.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,n.Z)(u,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function h(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:s.kM.common.editThisPage},r.createElement(v,null),r.createElement(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var E="blogPostTitle_d4p0",b="blogPostData_-Im+",_="blogPostDetailsFull_xD8n",f=a(7211),N="tags_NBRY",Z="tag_F03v";function k(e){var t=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,n.Z)(N,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return r.createElement("li",{key:a,className:Z},r.createElement(f.Z,{name:t,permalink:a}))}))))}var P="image_9q7L";var T=function(e){var t=e.author,a=t.name,n=t.title,l=t.url,i=t.imageURL;return r.createElement("div",{className:"avatar margin-bottom--sm"},i&&r.createElement(m.Z,{className:"avatar__photo-link avatar__photo",href:l},r.createElement("img",{className:P,src:i,alt:a})),a&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(m.Z,{href:l,itemProp:"url"},r.createElement("span",{itemProp:"name"},a))),n&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},n)))},w="authorCol_8c0z";function I(e){var t=e.authors,a=e.assets;return 0===t.length?r.createElement(r.Fragment,null):r.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var l;return r.createElement("div",{className:(0,n.Z)("col col--6",w),key:t},r.createElement(T,{author:Object.assign({},e,{imageURL:null!=(l=a.authorsImageUrls[t])?l:e.imageURL})}))})))}var y=function(e){var t,a,g,d,u=(g=(0,s.c2)().selectMessage,function(e){var t=Math.ceil(e);return g(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),p=(0,o.C)().withBaseUrl,v=e.children,f=e.frontMatter,N=e.assets,Z=e.metadata,P=e.truncated,T=e.isBlogPostPage,w=void 0!==T&&T,y=Z.date,L=Z.formattedDate,x=Z.permalink,B=Z.tags,C=Z.readingTime,M=Z.title,R=Z.editUrl,U=Z.authors,z=null!=(t=N.image)?t:f.image;return r.createElement("article",{className:w?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(d=w?"h1":"h2",r.createElement("header",null,r.createElement(d,{className:E,itemProp:"headline"},w?M:r.createElement(m.Z,{itemProp:"url",to:x},M)),r.createElement("div",{className:(0,n.Z)(b,"margin-vert--md")},r.createElement("time",{dateTime:y,itemProp:"datePublished"},L),void 0!==C&&r.createElement(r.Fragment,null," \xb7 ",u(C))),r.createElement(I,{authors:U,assets:N}))),z&&r.createElement("meta",{itemProp:"image",content:p(z,{absolute:!0})}),r.createElement("div",{className:"markdown",itemProp:"articleBody"},r.createElement(l.Zo,{components:c.Z},v)),(B.length>0||P)&&r.createElement("footer",{className:(0,n.Z)("row docusaurus-mt-lg",(a={},a[_]=w,a))},B.length>0&&r.createElement("div",{className:(0,n.Z)("col",{"col--9":!w})},r.createElement(k,{tags:B})),w&&R&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(h,{editUrl:R})),!w&&P&&r.createElement("div",{className:"col col--3 text--right"},r.createElement(m.Z,{to:Z.permalink,"aria-label":"Read more about "+M},r.createElement("b",null,r.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},4147:function(e,t,a){a.r(t),a.d(t,{default:function(){return g}});var r=a(7294),n=a(1217),l=a(6165),i=a(7937),m=a(4973),o=a(6742);var s=function(e){var t=e.nextItem,a=e.prevItem;return r.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,m.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},r.createElement("div",{className:"pagination-nav__item"},a&&r.createElement(o.Z,{className:"pagination-nav__link",to:a.permalink},r.createElement("div",{className:"pagination-nav__sublabel"},r.createElement(m.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")),r.createElement("div",{className:"pagination-nav__label"},"\xab ",a.title))),r.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&r.createElement(o.Z,{className:"pagination-nav__link",to:t.permalink},r.createElement("div",{className:"pagination-nav__sublabel"},r.createElement(m.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")),r.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))},c=a(941);var g=function(e){var t,a=e.content,m=e.sidebar,o=a.frontMatter,g=a.assets,d=a.metadata,u=d.title,p=d.description,v=d.nextItem,h=d.prevItem,E=d.date,b=d.tags,_=d.authors,f=o.hide_table_of_contents,N=o.keywords,Z=null!=(t=g.image)?t:o.image;return r.createElement(l.Z,{wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogPostPage,sidebar:m,toc:!f&&a.toc?a.toc:void 0},r.createElement(n.Z,{title:u,description:p,keywords:N,image:Z},r.createElement("meta",{property:"og:type",content:"article"}),r.createElement("meta",{property:"article:published_time",content:E}),_.some((function(e){return e.url}))&&r.createElement("meta",{property:"article:author",content:_.map((function(e){return e.url})).filter(Boolean).join(",")}),b.length>0&&r.createElement("meta",{property:"article:tag",content:b.map((function(e){return e.label})).join(",")})),r.createElement(i.Z,{frontMatter:o,assets:g,metadata:d,isBlogPostPage:!0},r.createElement(a,null)),(v||h)&&r.createElement(s,{nextItem:v,prevItem:h}))}},7211:function(e,t,a){a.d(t,{Z:function(){return s}});var r=a(7294),n=a(6010),l=a(6742),i="tag_WK-t",m="tagRegular_LXbV",o="tagWithCount_S5Zl";var s=function(e){var t,a=e.permalink,s=e.name,c=e.count;return r.createElement(l.Z,{href:a,className:(0,n.Z)(i,(t={},t[m]=!c,t[o]=c,t))},s,c&&r.createElement("span",null,c))}}}]);