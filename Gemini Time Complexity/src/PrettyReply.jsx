import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function PrettyReply({ markdown }) {
  if (!markdown) return null;

  const handleCopy = () => navigator.clipboard.writeText(markdown);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, position: "relative" }}>
      <Tooltip title="Copy raw markdown">
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Box
        className="markdown-body"
        sx={{
          "& pre": {
            p: 2,
            borderRadius: 2,
            overflowX: "auto",
            bgcolor: "background.default",
            border: (t) => `1px solid ${t.palette.divider}`,
          },
          "& code": {
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: "0.9rem",
            wordBreak: "break-word",
          },
          "& h1, & h2, & h3": { mt: 2 },
          "& table": {
            width: "100%",
            borderCollapse: "collapse",
            my: 2,
          },
          "& th, & td": {
            border: (t) => `1px solid ${t.palette.divider}`,
            p: 1,
            textAlign: "left",
          },
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: (props) => <Typography variant="h5" gutterBottom {...props} />,
            h2: (props) => <Typography variant="h6" gutterBottom {...props} />,
            h3: (props) => (
              <Typography variant="subtitle1" gutterBottom {...props} />
            ),
            p: (props) => <Typography sx={{ mb: 1.2 }} {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
}
