export const CHAT_BUBBLE_DOC_EN = {
  title: 'Chat Bubble',
  description: 'Displays a chat message bubble with header, content, and footer.',
  subDirectivesTitle: 'Sub-directives',
  subDirectives: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonChatBubbleHeader</code> — Sender name or metadata',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonChatBubbleContent</code> — Message body with variant support',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonChatBubbleFooter</code> — Timestamp or status text',
  ],
  propDescriptions: {
    align: 'Alignment of the chat bubble.',
    class: 'Additional CSS classes to apply.',
  },
  contentPropDescriptions: {
    variant: 'The visual style of the message content.',
    class: 'Additional CSS classes to apply.',
  },
};
