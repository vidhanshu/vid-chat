# Vid Chat : A private chat app

**How to run in local?**
1) Clone the repo OR download zip
2) Run `npm i` OR `yarn`
3) Create .env.local file in the project root, and paste the content as described in [.env.example](https://github.com/vidhanshu/vid-chat/blob/main/.env.example)
4) Do `npm run dev` OR `yarn dev` to start the project


Folder structure:

```
📦 
├─ .env.example
├─ .eslintrc.json
├─ .gitignore
├─ LICENSE
├─ README.md
├─ app
│  ├─ (auth)
│  │  └─ auth
│  │     ├─ layout.tsx
│  │     ├─ sign-in
│  │     │  └─ page.tsx
│  │     └─ sign-up
│  │        └─ page.tsx
│  ├─ (main)
│  │  ├─ chat
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ profile
│  │     └─ page.tsx
│  ├─ error.tsx
│  ├─ favicon.ico
│  ├─ global-error.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components.json
├─ components
│  └─ ui
│     ├─ badge.tsx
│     ├─ button.tsx
│     ├─ dialog.tsx
│     ├─ dropdown-menu.tsx
│     ├─ form.tsx
│     ├─ icon-button.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ sheet.tsx
│     ├─ skeleton.tsx
│     ├─ textarea.tsx
│     ├─ toast.tsx
│     ├─ toaster.tsx
│     ├─ tooltip.tsx
│     └─ use-toast.ts
├─ lib
│  └─ utils.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ message_received.mp3
│  ├─ message_sent.mp3
│  ├─ next.svg
│  └─ vercel.svg
├─ src
│  ├─ auth
│  │  ├─ components
│  │  │  ├─ SignIn.tsx
│  │  │  └─ SignUp.tsx
│  │  ├─ context
│  │  │  ├─ auth.context.tsx
│  │  │  ├─ auth.provider.tsx
│  │  │  └─ use-auth.tsx
│  │  ├─ services
│  │  │  └─ auth.service.ts
│  │  └─ types.d.ts
│  ├─ common
│  │  ├─ components
│  │  │  ├─ FileUploadInput.tsx
│  │  │  ├─ GenericLoadingPage.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ Tooltip.tsx
│  │  │  ├─ modals
│  │  │  │  ├─ delete-message-modal.tsx
│  │  │  │  ├─ edit-message-modal.tsx
│  │  │  │  ├─ send-file-modal.tsx
│  │  │  │  └─ view-image-modal.tsx
│  │  │  └─ providers
│  │  │     └─ modals-provider.tsx
│  │  ├─ hooks
│  │  │  ├─ use-debounce.tsx
│  │  │  ├─ use-modal.tsx
│  │  │  └─ use-mounted.tsx
│  │  ├─ service
│  │  │  └─ upload-file.service.ts
│  │  └─ utils
│  │     ├─ api.ts
│  │     ├─ download-file.ts
│  │     ├─ id-generator.ts
│  │     ├─ routes.ts
│  │     ├─ scroll-in-view.ts
│  │     └─ string-manipulation.ts
│  ├─ home
│  │  ├─ components
│  │  │  ├─ ChatPage.tsx
│  │  │  ├─ coversation
│  │  │  │  ├─ Conversation.tsx
│  │  │  │  ├─ ConversationHeader.tsx
│  │  │  │  ├─ ConversationSection.tsx
│  │  │  │  ├─ ConversationSkeleton.tsx
│  │  │  │  ├─ Message.tsx
│  │  │  │  ├─ NoActiveChat.tsx
│  │  │  │  ├─ NoConversations.tsx
│  │  │  │  └─ SendMessageInput.tsx
│  │  │  └─ sidebar
│  │  │     ├─ Sidebar.tsx
│  │  │     ├─ SidebarSearchInput.tsx
│  │  │     ├─ SidebarSkeleton.tsx
│  │  │     └─ UserCard.tsx
│  │  ├─ context
│  │  │  ├─ chat
│  │  │  │  ├─ chat.context.tsx
│  │  │  │  ├─ chat.provider.tsx
│  │  │  │  └─ use-chat.tsx
│  │  │  └─ socket
│  │  │     ├─ socket.context.tsx
│  │  │     ├─ socket.provider.tsx
│  │  │     └─ use-socket.tsx
│  │  ├─ hooks
│  │  │  └─ use-message-sockets.tsx
│  │  ├─ service
│  │  │  ├─ chat.service.ts
│  │  │  └─ user.service.ts
│  │  ├─ types.d.ts
│  │  └─ utils
│  │     ├─ send-message-handler.ts
│  │     └─ update-active-chats.ts
│  └─ profile
│     ├─ components
│     │  └─ profilePage.tsx
│     └─ service
│        └─ profile.service.ts
├─ tailwind.config.js
├─ tailwind.config.ts
└─ tsconfig.json
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)
