ue;
            }
        });
        lastHandledDialog = dlg.show();
    }

    /**
     * Tell the client to display a prompt dialog to the user.
     * If the client returns true, WebView will assume that the client will
     * handle the prompt dialog and call the appropriate JsPromptResult method.
     *
     * Since we are hacking prompts for our own purposes, we should not be using them for
     * this purpose, perhaps we should hack console.log to do this instead!
     */
    public void showPrompt(String message, String defaultValue, final Result result) {
        // Returning false would also show a dialog, but the default one shows the origin (ugly).
        AlertDialog.Builder dlg = new AlertDialog.Builder(context);
        dlg.setMessage(message);
        final EditText input = new EditText(context);
        if (defaultValue != null) {
            input.setText(defaultValue);
        }
        dlg.setView(input);
        dlg.setCancelable(false);
        dlg.setPositiveButton(android.R.string.ok,
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        String userText = input.getText().toString();
                        result.gotResult(true, userText);
                    }
                });
        dlg.setNegativeButton(android.R.string.cancel,
                ne