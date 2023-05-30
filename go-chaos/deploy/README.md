# Zeebe Chaos deployment

## Kubernetes configuration file

The Kubernetes configuration file is encrypted using [sops](https://github.com/mozilla/sops).

You need the right permissions to decrypt or encrypt the file:

To make changes to the file:

* Edit the file using:
  ```
  sops kubeconfig.yaml
  ```

  - The file will be decrypted and opened in your favorite editor.
  - It will be automatically re-encrypted when the editor is closed.
* To decrypt the encrypted file in-place, run:
  ```
  sops --decrypt --in-place kubeconfig.yaml
  ```
* To encrypt the decrypted file in-place, run:
  ```
  sops --encrypt --in-place kubeconfig.yaml
  ```

For more information, take a look at [the official documentation](https://github.com/mozilla/sops).
