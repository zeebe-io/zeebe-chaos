"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[89],{4428:function(e,a,t){t.r(a),t.d(a,{default:function(){return g}});var r=t(7294),l=t(2263),n=t(6165),i=t(7937),m=t(6742),s=t(4973);var o=function(e){var a=e.metadata,t=a.previousPage,l=a.nextPage;return r.createElement("nav",{className:"pagination-nav","aria-label":(0,s.I)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"})},r.createElement("div",{className:"pagination-nav__item"},t&&r.createElement(m.Z,{className:"pagination-nav__link",to:t},r.createElement("div",{className:"pagination-nav__label"},"\xab"," ",r.createElement(s.Z,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)"},"Newer Entries")))),r.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},l&&r.createElement(m.Z,{className:"pagination-nav__link",to:l},r.createElement("div",{className:"pagination-nav__label"},r.createElement(s.Z,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)"},"Older Entries")," ","\xbb"))))},c=t(941);var g=function(e){var a=e.metadata,t=e.items,m=e.sidebar,s=(0,l.Z)().siteConfig.title,g=a.blogDescription,d=a.blogTitle,p="/"===a.permalink?s:d;return r.createElement(n.Z,{title:p,description:g,wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogListPage,searchMetadatas:{tag:"blog_posts_list"},sidebar:m},t.map((function(e){var a=e.content;return r.createElement(i.Z,{key:a.metadata.permalink,frontMatter:a.frontMatter,assets:a.assets,metadata:a.metadata,truncated:a.metadata.truncated},r.createElement(a,null))})),r.createElement(o,{metadata:a}))}},7937:function(e,a,t){t.d(a,{Z:function(){return U}});var r=t(7294),l=t(6010),n=t(3905),i=t(4973),m=t(6742),s=t(4996),o=t(941),c=t(90),g=t(7462),d=t(3366),p="iconEdit_2_ui",u=["className"],h=function(e){var a=e.className,t=(0,d.Z)(e,u);return r.createElement("svg",(0,g.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(p,a),"aria-hidden":"true"},t),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function E(e){var a=e.editUrl;return r.createElement("a",{href:a,target:"_blank",rel:"noreferrer noopener",className:o.kM.common.editThisPage},r.createElement(h,null),r.createElement(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var v="blogPostTitle_GeHD",b="blogPostData_291c",_="blogPostDetailsFull_3kfx",f=t(7211),N="tags_2ga9",P="tag_11ep";function Z(e){var a=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,l.Z)(N,"padding--none","margin-left--sm")},a.map((function(e){var a=e.label,t=e.permalink;return r.createElement("li",{key:t,className:P},r.createElement(f.Z,{name:a,permalink:t}))}))))}var k="image_1yU8";var T=function(e){var a=e.author,t=a.name,l=a.title,n=a.url,i=a.imageURL;return r.createElement("div",{className:"avatar margin-bottom--sm"},i&&r.createElement(m.Z,{className:"avatar__photo-link avatar__photo",href:n},r.createElement("img",{className:k,src:i,alt:t})),t&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(m.Z,{href:n,itemProp:"url"},r.createElement("span",{itemProp:"name"},t))),l&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))},w="authorCol_1R69";function M(e){var a=e.authors,t=e.assets;return 0===a.length?r.createElement(r.Fragment,null):r.createElement("div",{className:"row margin-top--md margin-bottom--sm"},a.map((function(e,a){var n;return r.createElement("div",{className:(0,l.Z)("col col--6",w),key:a},r.createElement(T,{author:Object.assign({},e,{imageURL:null!=(n=t.authorsImageUrls[a])?n:e.imageURL})}))})))}var U=function(e){var a,t,g,d,p=(g=(0,o.c2)().selectMessage,function(e){var a=Math.ceil(e);return g(a,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}),u=(0,s.C)().withBaseUrl,h=e.children,f=e.frontMatter,N=e.assets,P=e.metadata,k=e.truncated,T=e.isBlogPostPage,w=void 0!==T&&T,U=P.date,x=P.formattedDate,y=P.permalink,C=P.tags,L=P.readingTime,R=P.title,B=P.editUrl,z=P.authors,D=null!=(a=N.image)?a:f.image;return r.createElement("article",{className:w?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(d=w?"h1":"h2",r.createElement("header",null,r.createElement(d,{className:v,itemProp:"headline"},w?R:r.createElement(m.Z,{itemProp:"url",to:y},R)),r.createElement("div",{className:(0,l.Z)(b,"margin-vert--md")},r.createElement("time",{dateTime:U,itemProp:"datePublished"},x),void 0!==L&&r.createElement(r.Fragment,null," \xb7 ",p(L))),r.createElement(M,{authors:z,assets:N}))),D&&r.createElement("meta",{itemProp:"image",content:u(D,{absolute:!0})}),r.createElement("div",{className:"markdown",itemProp:"articleBody"},r.createElement(n.Zo,{components:c.Z},h)),(C.length>0||k)&&r.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(t={},t[_]=w,t))},C.length>0&&r.createElement("div",{className:(0,l.Z)("col",{"col--9":!w})},r.createElement(Z,{tags:C})),w&&B&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(E,{editUrl:B})),!w&&k&&r.createElement("div",{className:"col col--3 text--right"},r.createElement(m.Z,{to:P.permalink,"aria-label":"Read more about "+R},r.createElement("b",null,r.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}}}]);