FROM alpine

# WORKDIR /
# COPY file-on-host.txt .
# COPY folder-on-host folder-in-image
# RUN touch file-in-image.txt
# USER uid:gid

# VOLUME /volume-mount-point
# EXPOSE 8080
# ENTRYPOINT ["/bin/sh", "-c"]
CMD ["/bin/sh", "-c"]
