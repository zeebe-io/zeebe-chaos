"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[103],{7937:function(e,t,a){a.d(t,{Z:function(){return x}});var r=a(7294),l=a(6010),n=a(3905),i=a(4973),o=a(6742),m=a(4996),s=a(941),c=a(90),g=a(7462),p=a(3366),u="iconEdit_2_ui",d=["className"],h=function(e){var t=e.className,a=(0,p.Z)(e,d);return r.createElement("svg",(0,g.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(u,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function v(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:s.kM.common.editThisPage},r.createElement(h,null),r.createElement(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var E="blogPostTitle_GeHD",b="blogPostData_291c",_="blogPostDetailsFull_3kfx",f=a(7211),N="tags_2ga9",P="tag_11ep";function Z(e){var t=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,l.Z)(N,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return r.createElement("li",{key:a,className:P},r.createElement(f.Z,{name:t,permalink:a}))}))))}var k="image_1yU8";var w=function(e){var t=e.author,a=t.name,l=t.title,n=t.url,i=t.imageURL;return r.createElement("div",{className:"avatar margin-bottom--sm"},i&&r.createElement(o.Z,{className:"avatar__photo-link avatar__photo",href:n},r.createElement("img",{className:k,src:i,alt:a})),a&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(o.Z,{href:n,itemProp:"url"},r.createElement("span",{itemProp:"name"},a))),l&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))},T="authorCol_1R69";function y(e){var t=e.authors,a=e.assets;return 0===t.length?r.createElement(r.Fragment,null):r.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var n;return r.createElement("div",{className:(0,l.Z)("col col--6",T),key:t},r.createElement(w,{author:Object.assign({},e,{imageURL:null!=(n=a.authorsImageUrls[t])?n:e.imageURL})}))})))}var x=function(e){var t,a,g,p,u=(g=(0,s.c2)().selectMessage,function(e){var t=Math.ceil(e);return g(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),d=(0,m.C)().withBaseUrl,h=e.children,f=e.frontMatter,N=e.assets,P=e.metadata,k=e.truncated,w=e.isBlogPostPage,T=void 0!==w&&w,x=P.date,I=P.formattedDate,M=P.permalink,U=P.tags,B=P.readingTime,C=P.title,R=P.editUrl,L=P.authors,z=null!=(t=N.image)?t:f.image;return r.createElement("article",{className:T?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(p=T?"h1":"h2",r.createElement("header",null,r.createElement(p,{className:E,itemProp:"headline"},T?C:r.createElement(o.Z,{itemProp:"url",to:M},C)),r.createElement("div",{className:(0,l.Z)(b,"margin-vert--md")},r.createElement("time",{dateTime:x,itemProp:"datePublished"},I),void 0!==B&&r.createElement(r.Fragment,null," \xb7 ",u(B))),r.createElement(y,{authors:L,assets:N}))),z&&r.createElement("meta",{itemProp:"image",content:d(z,{absolute:!0})}),r.createElement("div",{className:"markdown",itemProp:"articleBody"},r.createElement(n.Zo,{components:c.Z},h)),(U.length>0||k)&&r.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(a={},a[_]=T,a))},U.length>0&&r.createElement("div",{className:(0,l.Z)("col",{"col--9":!T})},r.createElement(Z,{tags:U})),T&&R&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(v,{editUrl:R})),!T&&k&&r.createElement("div",{className:"col col--3 text--right"},r.createElement(o.Z,{to:P.permalink,"aria-label":"Read more about "+C},r.createElement("b",null,r.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},4147:function(e,t,a){a.r(t),a.d(t,{default:function(){return g}});var r=a(7294),l=a(1217),n=a(6165),i=a(7937),o=a(4973),m=a(6742);var s=function(e){var t=e.nextItem,a=e.prevItem;return r.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,o.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},r.createElement("div",{className:"pagination-nav__item"},a&&r.createElement(m.Z,{className:"pagination-nav__link",to:a.permalink},r.createElement("div",{className:"pagination-nav__sublabel"},r.createElement(o.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")),r.createElement("div",{className:"pagination-nav__label"},"\xab ",a.title))),r.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&r.createElement(m.Z,{className:"pagination-nav__link",to:t.permalink},r.createElement("div",{className:"pagination-nav__sublabel"},r.createElement(o.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")),r.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))},c=a(941);var g=function(e){var t,a=e.content,o=e.sidebar,m=a.frontMatter,g=a.assets,p=a.metadata,u=p.title,d=p.description,h=p.nextItem,v=p.prevItem,E=p.date,b=p.tags,_=p.authors,f=m.hide_table_of_contents,N=m.keywords,P=null!=(t=g.image)?t:m.image;return r.createElement(n.Z,{wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogPostPage,sidebar:o,toc:!f&&a.toc?a.toc:void 0},r.createElement(l.Z,{title:u,description:d,keywords:N,image:P},r.createElement("meta",{property:"og:type",content:"article"}),r.createElement("meta",{property:"article:published_time",content:E}),_.some((function(e){return e.url}))&&r.createElement("meta",{property:"article:author",content:_.map((function(e){return e.url})).filter(Boolean).join(",")}),b.length>0&&r.createElement("meta",{property:"article:tag",content:b.map((function(e){return e.label})).join(",")})),r.createElement(i.Z,{frontMatter:m,assets:g,metadata:p,isBlogPostPage:!0},r.createElement(a,null)),(h||v)&&r.createElement(s,{nextItem:h,prevItem:v}))}}}]);