"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3089],{6165:function(e,t,a){a.d(t,{Z:function(){return b}});var r=a(3366),l=a(7294),n=a(6010),i=a(7111),m=a(6742),s="sidebar_q+wC",o="sidebarItemTitle_9G5K",c="sidebarItemList_6T4b",g="sidebarItem_cjdF",d="sidebarItemLink_zyXk",u="sidebarItemLinkActive_wcJs",p=a(4973);function v(e){var t=e.sidebar;return 0===t.items.length?null:l.createElement("nav",{className:(0,n.Z)(s,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,n.Z)(o,"margin-bottom--md")},t.title),l.createElement("ul",{className:c},t.items.map((function(e){return l.createElement("li",{key:e.permalink,className:g},l.createElement(m.Z,{isNavLink:!0,to:e.permalink,className:d,activeClassName:u},e.title))}))))}var E=a(571),h=["sidebar","toc","children"];var b=function(e){var t=e.sidebar,a=e.toc,m=e.children,s=(0,r.Z)(e,h),o=t&&t.items.length>0;return l.createElement(i.Z,s,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},o&&l.createElement("aside",{className:"col col--3"},l.createElement(v,{sidebar:t})),l.createElement("main",{className:(0,n.Z)("col",{"col--7":o,"col--9 col--offset-1":!o}),itemScope:!0,itemType:"http://schema.org/Blog"},m),a&&l.createElement("div",{className:"col col--2"},l.createElement(E.Z,{toc:a})))))}},4428:function(e,t,a){a.r(t),a.d(t,{default:function(){return g}});var r=a(7294),l=a(2263),n=a(6165),i=a(7937),m=a(6742),s=a(4973);var o=function(e){var t=e.metadata,a=t.previousPage,l=t.nextPage;return r.createElement("nav",{className:"pagination-nav","aria-label":(0,s.I)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"})},r.createElement("div",{className:"pagination-nav__item"},a&&r.createElement(m.Z,{className:"pagination-nav__link",to:a},r.createElement("div",{className:"pagination-nav__label"},"\xab"," ",r.createElement(s.Z,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)"},"Newer Entries")))),r.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},l&&r.createElement(m.Z,{className:"pagination-nav__link",to:l},r.createElement("div",{className:"pagination-nav__label"},r.createElement(s.Z,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)"},"Older Entries")," ","\xbb"))))},c=a(941);var g=function(e){var t=e.metadata,a=e.items,m=e.sidebar,s=(0,l.Z)().siteConfig.title,g=t.blogDescription,d=t.blogTitle,u="/"===t.permalink?s:d;return r.createElement(n.Z,{title:u,description:g,wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogListPage,searchMetadatas:{tag:"blog_posts_list"},sidebar:m},a.map((function(e){var t=e.content;return r.createElement(i.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,assets:t.assets,metadata:t.metadata,truncated:t.metadata.truncated},r.createElement(t,null))})),r.createElement(o,{metadata:t}))}},7937:function(e,t,a){a.d(t,{Z:function(){return I}});var r=a(7294),l=a(6010),n=a(3905),i=a(4973),m=a(6742),s=a(4996),o=a(941),c=a(90),g=a(7462),d=a(3366),u="iconEdit_mS5F",p=["className"],v=function(e){var t=e.className,a=(0,d.Z)(e,p);return r.createElement("svg",(0,g.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(u,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function E(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:o.kM.common.editThisPage},r.createElement(v,null),r.createElement(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var h="blogPostTitle_d4p0",b="blogPostData_-Im+",_="blogPostDetailsFull_xD8n",f=a(7211),N="tags_NBRY",Z="tag_F03v";function k(e){var t=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,l.Z)(N,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return r.createElement("li",{key:a,className:Z},r.createElement(f.Z,{name:t,permalink:a}))}))))}var P="image_9q7L";var T=function(e){var t=e.author,a=t.name,l=t.title,n=t.url,i=t.imageURL;return r.createElement("div",{className:"avatar margin-bottom--sm"},i&&r.createElement(m.Z,{className:"avatar__photo-link avatar__photo",href:n},r.createElement("img",{className:P,src:i,alt:a})),a&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(m.Z,{href:n,itemProp:"url"},r.createElement("span",{itemProp:"name"},a))),l&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))},w="authorCol_8c0z";function L(e){var t=e.authors,a=e.assets;return 0===t.length?r.createElement(r.Fragment,null):r.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var n;return r.createElement("div",{className:(0,l.Z)("col col--6",w),key:t},r.createElement(T,{author:Object.assign({},e,{imageURL:null!=(n=a.authorsImageUrls[t])?n:e.imageURL})}))})))}var I=function(e){var t,a,g,d,u=(g=(0,o.c2)().selectMessage,function(e){var t=Math.ceil(e);return g(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),p=(0,s.C)().withBaseUrl,v=e.children,f=e.frontMatter,N=e.assets,Z=e.metadata,P=e.truncated,T=e.isBlogPostPage,w=void 0!==T&&T,I=Z.date,y=Z.formattedDate,C=Z.permalink,M=Z.tags,x=Z.readingTime,B=Z.title,R=Z.editUrl,U=Z.authors,z=null!=(t=N.image)?t:f.image;return r.createElement("article",{className:w?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(d=w?"h1":"h2",r.createElement("header",null,r.createElement(d,{className:h,itemProp:"headline"},w?B:r.createElement(m.Z,{itemProp:"url",to:C},B)),r.createElement("div",{className:(0,l.Z)(b,"margin-vert--md")},r.createElement("time",{dateTime:I,itemProp:"datePublished"},y),void 0!==x&&r.createElement(r.Fragment,null," \xb7 ",u(x))),r.createElement(L,{authors:U,assets:N}))),z&&r.createElement("meta",{itemProp:"image",content:p(z,{absolute:!0})}),r.createElement("div",{className:"markdown",itemProp:"articleBody"},r.createElement(n.Zo,{components:c.Z},v)),(M.length>0||P)&&r.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(a={},a[_]=w,a))},M.length>0&&r.createElement("div",{className:(0,l.Z)("col",{"col--9":!w})},r.createElement(k,{tags:M})),w&&R&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(E,{editUrl:R})),!w&&P&&r.createElement("div",{className:"col col--3 text--right"},r.createElement(m.Z,{to:Z.permalink,"aria-label":"Read more about "+B},r.createElement("b",null,r.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},7211:function(e,t,a){a.d(t,{Z:function(){return o}});var r=a(7294),l=a(6010),n=a(6742),i="tag_WK-t",m="tagRegular_LXbV",s="tagWithCount_S5Zl";var o=function(e){var t,a=e.permalink,o=e.name,c=e.count;return r.createElement(n.Z,{href:a,className:(0,l.Z)(i,(t={},t[m]=!c,t[s]=c,t))},o,c&&r.createElement("span",null,c))}}}]);