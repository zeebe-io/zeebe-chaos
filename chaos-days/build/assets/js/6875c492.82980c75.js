"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[610],{7937:function(e,t,a){a.d(t,{Z:function(){return y}});var r=a(7294),l=a(6010),n=a(3905),s=a(4973),m=a(6742),i=a(4996),o=a(941),c=a(90),g=a(7462),u=a(3366),d="iconEdit_2_ui",p=["className"],h=function(e){var t=e.className,a=(0,u.Z)(e,p);return r.createElement("svg",(0,g.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(d,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function E(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:o.kM.common.editThisPage},r.createElement(h,null),r.createElement(s.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var b="blogPostTitle_GeHD",f="blogPostData_291c",v="blogPostDetailsFull_3kfx",P=a(7211),_="tags_2ga9",N="tag_11ep";function k(e){var t=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(s.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,l.Z)(_,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return r.createElement("li",{key:a,className:N},r.createElement(P.Z,{name:t,permalink:a}))}))))}var Z="image_1yU8";var T=function(e){var t=e.author,a=t.name,l=t.title,n=t.url,s=t.imageURL;return r.createElement("div",{className:"avatar margin-bottom--sm"},s&&r.createElement(m.Z,{className:"avatar__photo-link avatar__photo",href:n},r.createElement("img",{className:Z,src:s,alt:a})),a&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(m.Z,{href:n,itemProp:"url"},r.createElement("span",{itemProp:"name"},a))),l&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))},w="authorCol_1R69";function M(e){var t=e.authors,a=e.assets;return 0===t.length?r.createElement(r.Fragment,null):r.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var n;return r.createElement("div",{className:(0,l.Z)("col col--6",w),key:t},r.createElement(T,{author:Object.assign({},e,{imageURL:null!=(n=a.authorsImageUrls[t])?n:e.imageURL})}))})))}var y=function(e){var t,a,g,u,d=(g=(0,o.c2)().selectMessage,function(e){var t=Math.ceil(e);return g(t,(0,s.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),p=(0,i.C)().withBaseUrl,h=e.children,P=e.frontMatter,_=e.assets,N=e.metadata,Z=e.truncated,T=e.isBlogPostPage,w=void 0!==T&&T,y=N.date,U=N.formattedDate,x=N.permalink,C=N.tags,L=N.readingTime,z=N.title,R=N.editUrl,B=N.authors,D=null!=(t=_.image)?t:P.image;return r.createElement("article",{className:w?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(u=w?"h1":"h2",r.createElement("header",null,r.createElement(u,{className:b,itemProp:"headline"},w?z:r.createElement(m.Z,{itemProp:"url",to:x},z)),r.createElement("div",{className:(0,l.Z)(f,"margin-vert--md")},r.createElement("time",{dateTime:y,itemProp:"datePublished"},U),void 0!==L&&r.createElement(r.Fragment,null," \xb7 ",d(L))),r.createElement(M,{authors:B,assets:_}))),D&&r.createElement("meta",{itemProp:"image",content:p(D,{absolute:!0})}),r.createElement("div",{className:"markdown",itemProp:"articleBody"},r.createElement(n.Zo,{components:c.Z},h)),(C.length>0||Z)&&r.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(a={},a[v]=w,a))},C.length>0&&r.createElement("div",{className:(0,l.Z)("col",{"col--9":!w})},r.createElement(k,{tags:C})),w&&R&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(E,{editUrl:R})),!w&&Z&&r.createElement("div",{className:"col col--3 text--right"},r.createElement(m.Z,{to:N.permalink,"aria-label":"Read more about "+z},r.createElement("b",null,r.createElement(s.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},9404:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var r=a(7294),l=a(6742),n=a(6165),s=a(7937),m=a(4973),i=a(941);function o(e){var t,a=e.metadata,o=e.items,c=e.sidebar,g=a.allTagsPath,u=a.name,d=a.count,p=(t=(0,i.c2)().selectMessage,function(e){return t(e,(0,m.I)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:e}))}),h=(0,m.I)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:p(d),tagName:u});return r.createElement(n.Z,{title:h,wrapperClassName:i.kM.wrapper.blogPages,pageClassName:i.kM.page.blogTagPostListPage,searchMetadatas:{tag:"blog_tags_posts"},sidebar:c},r.createElement("header",{className:"margin-bottom--xl"},r.createElement("h1",null,h),r.createElement(l.Z,{href:g},r.createElement(m.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags"))),o.map((function(e){var t=e.content;return r.createElement(s.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,assets:t.assets,metadata:t.metadata,truncated:!0},r.createElement(t,null))})))}}}]);